import React from 'react'
import { hydrate } from 'react-dom'
import { Application } from './app';
import { BrowserRouter } from 'react-router-dom';

let myWindow = window as any;

hydrate(
    <BrowserRouter>
        <Application />
    </BrowserRouter>,
    document.getElementById('app')
);