import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Tutorial, } from 'interfaces/tutorial';
import { TutorialService } from 'services/tutorialService';

export const TutorialList = () => {

    const ts = new TutorialService();
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);

    /** For on mount */
    useEffect(() => {
        const retrieveTutorials = async () => {
            const tutorials = await ts.getTutorials();
            setTutorials(tutorials);
        };

        retrieveTutorials();
    }, []);

    return (
        <div className="tutorial-list">
            <div className="body">
                {tutorials.map((tutorial, index) => {
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