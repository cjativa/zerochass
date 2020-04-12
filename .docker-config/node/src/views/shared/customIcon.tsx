import React, { useState, useEffect } from 'react';

export const CustomIcon = () => {
    return (
        <span id="progress-span" className="fa-stack fa-2x" onClick={() => { console.log(`You clicked the icon`) }}>
            <i className={`fas fa-circle fa-stack-2x bg`}></i>
            <i className={`fas fa-check fa-stack-1x fa-inverse fg`} style={{ fontSize: '38px' }}></i>
        </span>
    );
}