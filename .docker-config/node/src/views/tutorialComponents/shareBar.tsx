import React, { useState } from 'react';

interface Props {
    tutorialTitle: string
}

export const ShareBar = (props: Props) => {

    const [value, setValue] = useState('');
    const [typed, setTyped] = useState(false);

    const { tutorialTitle } = props;
    const taText = `I just enrolled in a tutorial at Zerochass! \n\nSo excited to start learning ${tutorialTitle}`;

    const onChange = (event) => {

        if (!typed) {
            setTyped(true);
        }

        // Update the value
        const { value } = event.target;
        setValue(value);
    }

    const onFocus = (event) => {

        if (!typed || value.length == 0) {
            setValue(taText);
        }
    }

    return (
        <div className="tutorial-share-bar">
            <div className="share-box">
                <span className="box-title">Share</span>
                <span className="box-subtitle">Motivate your friends!</span>
                <textarea rows={6} cols={30} placeholder={taText} onFocus={onFocus} value={value} onChange={onChange}>
                </textarea>
            </div>
        </div>
    )
}