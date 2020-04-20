import React, { useState, useEffect } from 'react';

export const CustomIcon = ({ icon, color, onClick }) => {

    return (
        <span className="fa-stack fa-2x circle" onClick={() => { onClick() }}>
            <i className={`fas fa-circle fa-stack-2x bg`} style={{ color }}></i>
            <i className={`${icon} fa-stack-1x fa-inverse fg`}></i>
        </span>
    );
}