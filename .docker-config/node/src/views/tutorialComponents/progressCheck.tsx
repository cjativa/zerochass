import React, { useState, useEffect } from 'react';

interface Props {
    sectionCompleted: boolean,
    onProgressClick: any
}

export const ProgressCheck = (props: Props) => {

    let progressClass = '';

    switch (props.sectionCompleted) {
        case null:
            progressClass = 'not-started';
            break;
        case false:
            progressClass = 'in-progress';
            break;
        case true:
            progressClass = 'completed';
            break;
        default:
            progressClass = '';
            break;
    }

    const { onProgressClick } = props;

    return (
        <span id="progress-span" className="fa-stack fa-2x" onClick={onProgressClick}>
            <i className={`fas fa-circle fa-stack-2x ${progressClass}-bg`}></i>
            <i className={`fas fa-check fa-stack-1x fa-inverse ${progressClass}-fg`} style={{ fontSize: '38px' }}></i>
        </span>
    );
}
