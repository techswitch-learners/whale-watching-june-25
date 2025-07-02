import WhaleInfo from "../../components/WhaleInfo";
import "./WhaleInfoPage.scss";
import React from "react";


const WhaleInfoPage: React.FunctionComponent = () => {

    return (
        <div>
            <h1 className="title">How to find a whale</h1>
            <WhaleInfo/>
        </div>
    );
}