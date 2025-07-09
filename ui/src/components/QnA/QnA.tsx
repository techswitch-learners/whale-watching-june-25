import { useState } from 'react';
import './QnA.scss'
import { Question, Record } from 'react-bootstrap-icons';

type Option ={
    Text: string,
    Species: string
}

type Question = {
    Question: string,
    Options: Option[]
}

type Result ={
    Species: string,
    Title: string,
    Description: string
}

interface QuestionProps {
   QuestionSet :{
        Questions: Question[],
        Results: Result[]
    }
};

const QnA: React.FC<QuestionProps> = (props: QuestionProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<Option | null>(null);
    const [whale, setWhale] = useState<Result | null>(null);
    const [message, setMessage] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [count, setCount] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    const handleNextButtonClick: () => void = () => {
        
        if (selectedAnswer!= null){ 
            setIsVisible(false);
            setSelectedAnswers((prev) => ({
            ...prev,
            [selectedAnswer.Species]: (prev[selectedAnswer.Species] || 0) + 1
            }));  

            if (count ===props.QuestionSet.Questions.length){
                setIsCompleted(true);
                let result = findResult(findMax());
                if (result != undefined) {
                    setWhale(result);
                }
            }
            else {
                setCount(count+1);
                setCurrentQuestion(count);
                resetRadio();
            }
            setSelectedAnswer(null);
        }
        else {
            setMessage("Please select an answer!");
            setIsVisible(true);
        }
    }

    const handleTryAgainButtonClick: () => void = () => {
        resetStatus();
    };

    function resetRadio() {
        var radio = null;
        for (var i = 0; i < 4; i++) {
            radio = document.getElementById(`answerOption-${i}`);
            (radio as HTMLInputElement).checked = false;
        }
    }

    function findResult(Species: string) : Result | undefined{
       return props.QuestionSet.Results.find((result)=>
            result.Species===Species);
    }

    function findMax() : string{
        let max = 0;
        let returnKey ="";
        for (const key in selectedAnswers){
            if (selectedAnswers[key]>max){
                max = selectedAnswers[key];
                returnKey = key;
            }
        }
        return returnKey;
    }

    function resetStatus(){
        setCurrentQuestion(0);
        setCount(1);
        setSelectedAnswers({});
        setMessage("");
        setIsCompleted(false);
        setSelectedAnswer(null);
        setWhale(null);
    }

    if (!isCompleted) {
    return (
        <div>
            <p className='QuizSubtitle'>Dive into this playful quiz and discover your inner whale based on your personality and lifestyle!</p>
            <div className="Question">
                <p id="Question">{count}. {props.QuestionSet.Questions[currentQuestion].Question}</p>
                {/* <fieldset> */}
                <div className='Answer'>
                <ul>{props.QuestionSet.Questions[currentQuestion].Options.map((answerOption: Option, optionIndex: number) => (
                    <li list-style-type="none" key={`li-${optionIndex}`}>
                    <input type="radio" name={`question-${currentQuestion}`} id={`answerOption-${optionIndex}`} onChange={() => {setSelectedAnswer(answerOption); setIsVisible(false)}} />
                    <label className = "label-answer" key={`label-${optionIndex}`} htmlFor={`answerOption-${optionIndex}`}>                        {answerOption.Text}
                    </label>
                    
                    </li>
                ))} </ul>
                </div>
                {/* </fieldset> */}
            </div>
            <button onClick={handleNextButtonClick} className="next-button">
            Next
            </button>
                {isVisible && <p className='ErrorMessage'>{message} </p>}
                <br/>
        </div>
    );
}
else {
    return (
        <div className="FinalResult">
            <br/>
            <h1>{whale?.Title}</h1>
            <h2>{whale?.Description}</h2>
            <br/>
            <h3>Thank you for your participation!</h3>
            <br/>
            <button onClick={handleTryAgainButtonClick} className="submit-button">
            Try Again
            </button>
        </div>
    );
}
}

export default QnA;