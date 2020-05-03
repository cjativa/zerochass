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
        delete window.__INITIAL_DATA__.tutorials;
        data = [];
    }
    else data = props.staticContext.tutorials;


    const [tutorials, setTutorials] = useState<Tutorial[]>(data);


    useEffect(() => {
        if (tutorials.length == 0) setContent();
    }, [])

    return (
        <div className="tutorial-list">
            <div className="body">
                {tutorials && tutorials.map((tutorial, index) => {
                    return <TutorialListCard key={index} tutorial={tutorial} />
                })}
            </div>
        </div>
    )
}

const TutorialListCard = ({ tutorial }: { tutorial: Tutorial }) => {

    const { featuredImage, title, color, description, slug } = tutorial;
    const shorterDescription = description[0].secondLine;

    const imageUrl = featuredImage[0].url;

    return (
        <Link className="tl-card" to={`/tutorial/${slug}`}>
            <div className={`tl-card__top ${color}`}  >
                <img className="tl-card__image" src={imageUrl} style={{ height: '100%', width: 'auto', position: 'absolute' }} />
                <div className="tl-card__layer" />

            </div>
            <div className={`tl-card__bottom`}>
                <h1 className="tl-card__title">{title}</h1>
                {shorterDescription}
            </div>
        </Link>
    )
};