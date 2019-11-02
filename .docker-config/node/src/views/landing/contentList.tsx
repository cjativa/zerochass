import React, { useState, useEffect } from 'react';

import { TutorialService } from "services/tutorialService";
import { Tutorial } from 'interfaces/tutorial';
import { TutorialCard } from 'views/landing/tutorialCard';
import { colorWeights, colors } from 'constants/colors';

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

        return colorWeights[colorA] - colorWeights[colorB];
    }

    const generateFourColor = (tutorials: Tutorial[]): Tutorial[] => {

        const sortedTutorials = [];

        // Extract 4 tutorials in this order as much as possible
        while (checkForFourColors(tutorials)) {
            colors.forEach((color) => {
                const index = tutorials.findIndex((tutorial) => { return tutorial.color === color ; });
                sortedTutorials.push(tutorials[index]);
                tutorials.splice(index, 1);
            });
        }

        // Sort the remaining ones by color
        tutorials.sort(byColor);

        return [...sortedTutorials, ...tutorials];
    }

    const checkForFourColors = (tutorials: Tutorial[]) => {

        let black, pink, teal, white;

        black = (tutorials.some((tutorial) => { return tutorial.color === 'black' })) ? true : false;
        pink = (tutorials.some((tutorial) => { return tutorial.color === 'pink' })) ? true : false;
        teal = (tutorials.some((tutorial) => { return tutorial.color === 'teal' })) ? true : false;
        white = (tutorials.some((tutorial) => { return tutorial.color === 'white' })) ? true : false;

        return black && pink && teal && white;
    }


    useEffect(() => {
        retrieveTutorials();
    }, [])

    if (tutorialState === null) {
        return <></>
    }

    const { tutorials } = tutorialState;
    const sorted = generateFourColor(tutorials);

    return (

        <div className="content-list">
            {sorted.map((tutorial, index) => {
                return (<TutorialCard tutorial={tutorial} key={index} />)
            })}
        </div>
    );
}
