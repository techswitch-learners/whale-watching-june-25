import WhaleInfo from "../../components/WhaleInfo/WhaleInfo";
import { Page } from "../Page/Page";
import "./WhaleInfoPage.scss";
import React from "react";


const WhaleInfoPage: React.FunctionComponent = () => {

    return (
        <Page>
        <div className="whale-info">
            <h1 className="whale-info-title">How to find a whale</h1>
            <div className='image-container'>
                <img src="https://www.sailorsforthesea.org/sites/default/files/Whale2.jpg" alt="general image of whale" />
            </div>
            <h3 className="subtitle">If you&rsquo;ve never seen a whale before, it can be hard to know what to look for. Here are some general and specific tips that may help you see and identify specific species.</h3>
                <div className="text-container">
                        <ol className='general-tips-list'>
                            <li> Scan from left to right, slowly, and then back again. Look close to shore, and look out across the horizon. Watch for anything that breaks the surface of the water.</li>
                            <li> Look for boats, especially if they are stopped. Sometimes the best way to find marine mammals is to find the other people who are watching them. </li>
                            <li> Don&rsquo;t get fooled by driftwood or logs that look like animals, floating on the surface of the water. </li>
                        </ol>
                </div>
            <WhaleInfo/>
        </div>
        </Page>
    );
}

export default WhaleInfoPage;