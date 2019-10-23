import React, { useState, useEffect } from 'react';

import { TutorialService } from "services/tutorialService";
import { Tutorial } from 'interfaces/tutorial';
import { TutorialCard } from 'views/landing/tutorialCard';
import { colors } from 'constants/colors';

export const ContentList = () => {

    const ts = new TutorialService();
    const [tutorialState, setTutorialState] = useState<{ tutorials: Tutorial[] }>(null);

    /** Retrieves the tutorials and sets it into the state */
    const retrieveTutorials = async () => {
        const tutorials = await ts.getTutorials();
        setTutorialState({ tutorials });
    }

    const byColor = (a: Tutorial, b: Tutorial): number => {

        const colorA = a.color;
        const colorB = b.color;

        return colors[colorA] - colors[colorB];
    }


    useEffect(() => {
        retrieveTutorials();
    }, [])

    if (tutorialState === null) {
        return <></>
    }

    const { tutorials } = tutorialState;

    return (

        <div className="content-list">
            {tutorials && tutorials.sort(byColor).map((tutorial, index) => {
                return (<TutorialCard tutorial={tutorial} key={index} />)
            })}
        </div>
    );
}
