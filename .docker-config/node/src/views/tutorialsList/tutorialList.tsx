import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Tutorial, } from '../../interfaces/tutorial';
import { TutorialService } from '../../services/tutorialService';

declare const __isBrowser__: string;
declare const window: any;

interface props {
    tutorials: Tutorial[]
}

export const TutorialList = (props) => {

    // Fetch the content
    const setContent = async () => {
        const ts = new TutorialService();
        const tutorials = await ts.getTutorials();
        setTutorials(tutorials);
    };

    let data;

    if (__isBrowser__) {
        data = window.__INITIAL_DATA__.tutorials;
        delete window.__INITIAL_DATA__.tutorials;
    }
    else data = props.staticContext.tutorials;


    const [tutorials, setTutorials] = useState<Tutorial[]>(data);


    useEffect(() => {
        console.log(`Mounting`);
        setContent();
    }, [])

    return (
        <div className="tutorial-list">
            <div className="body">
                {tutorials && tutorials.map((tutorial, index) => {
                    console.log(tutorial.title);
                    return <TutorialListCard key={index} tutorial={tutorial} />
                })}
            </div>
        </div>
    )
}

const TutorialListCard = ({ tutorial }: { tutorial: Tutorial }) => {

    const { featuredImage, title, color, description, slug } = tutorial;
    const shorterDescription = description[0].secondLine;

    return (
        <Link className="tl-card" to={`/tutorial/${slug}`}>
            <div className={`tl-card__top ${color}`}>
                <div className="tl-card__layer" />
                <h1 className="tl-card__title">{title}</h1>
            </div>
            <div className={`tl-card__bottom`}>
                {shorterDescription}
            </div>
        </Link>
    )
};