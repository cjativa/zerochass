import React, { useState, useEffect } from 'react';

import { Tutorial } from '../interfaces/tutorial';
import { TutorialPage } from '../views/tutorialComponents/tutorialPage';
import { TutorialService } from '../services/tutorialService';
import { useLocation } from 'react-router-dom';


export const TutorialContainer = (props) => {

	const ts = new TutorialService();
	const [tutorialState, setTutorialState] = useState<{ tutorial: Tutorial }>(null);

	/** Retrieves the tutorial and sets it into the state */
	const retrieveTutorial = async () => {
		const slug = props.match.params.slug;

		const tutorial = await ts.getTutorial(slug);
		setTutorialState({ tutorial });
	}

	useEffect(() => {
		retrieveTutorial();
	}, [])

	if (tutorialState == null) {
		return <></>
	}

	const { tutorial } = tutorialState;

	return (
		<TutorialPage tutorial={tutorial} />
	)
}
