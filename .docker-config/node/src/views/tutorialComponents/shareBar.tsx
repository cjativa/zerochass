import React, { useState } from 'react';

interface Props {
    tutorialTitle: string
}

export const ShareBar = (props: Props) => {

    const [value, setValue] = useState('');
    const [typed, setTyped] = useState(false);

    const { tutorialTitle } = props;
    const taText = `I just started a tutorial at Zerochass.io! \n\nSo excited to begin learning about "${tutorialTitle}"`;

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

    const onBlur = (event) => {
        if (value === taText) {
            setValue('');
        }
    }

    return (
        <div className="tutorial-share-bar">
            <div className="share-box">
                <span className="box-title">Share</span>
                <span className="box-subtitle">Motivate your friends!</span>
                <textarea rows={6} cols={30} placeholder={taText} onFocus={onFocus} onBlur={onBlur} value={value} onChange={onChange}>
                </textarea>
            </div>
        </div>
    )
}