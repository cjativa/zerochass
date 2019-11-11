import * as React from 'react';

interface Props {
    tutorialTitle: string
}

export const ShareBar = (props: Props) => {

    const { tutorialTitle } = props;

    return (
        <div className="tutorial-share-bar">
            <div className="share-box">
                <span className="box-title">Share</span>
                <span className="box-subtitle">Motivate your friends!</span>
                <textarea rows={6} cols={30} placeholder={`I just enrolled in a tutorial at Zerochass! \n\nSo excited to start learning ${tutorialTitle}`}>
                </textarea>
            </div>
        </div>
    )
}