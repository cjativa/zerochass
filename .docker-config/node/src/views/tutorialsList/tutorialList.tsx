import React, { useState, useEffect } from 'react';

import { Tutorial, } from 'interfaces/tutorial';
import { TutorialPage } from 'views/tutorialComponents/tutorialPage';
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

    const { featuredImage, title, color, description } = tutorial;
    const shorterDescription = description[0].secondLine;

    return (
        <div className="tl-card">
            <div className={`tl-card__top ${color}`}>
                {title}
            </div>
            <div className="tl-card__bottom">
                {shorterDescription}
            </div>
        </div>
    )
};