import React from 'react';
import './Quiz.scss';
import QnA from '../../components/QnA/QnA';
import WhaleQuiz from '../../assets/what_kind_of_whale_are_you_quiz.json';

const Quiz: React.FunctionComponent = () => {

    return (
        <div>
            <p className='QuizTitle'>🐋 What Whale Are You?</p>
            <QnA QuestionSet={WhaleQuiz}/>
        </div>
    );
}

export default Quiz;