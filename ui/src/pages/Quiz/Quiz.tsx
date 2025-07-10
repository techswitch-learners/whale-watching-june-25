import React from 'react';
import './Quiz.scss';
import QnA from '../../components/QnA/QnA';
import WhaleQuiz from '../../assets/what_kind_of_whale_are_you_quiz.json';
import { Page } from '../Page/Page';

const Quiz: React.FunctionComponent = () => {

    return (
        <Page>
            <div>
                <p className='QuizTitle'>🐋 What Whale Are You?</p>
                <QnA QuestionSet={WhaleQuiz}/>
            </div>
        </Page>
    );
}

export default Quiz;