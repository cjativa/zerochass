import React, { useState, useEffect } from 'react';

import { Tutorial } from '../interfaces/tutorial';
import { TutorialPage } from '../views/tutorialComponents/tutorialPage';
import { TutorialService } from '../services/tutorialService';
import { useLocation } from 'react-router-dom';

declare const __isBrowser__: string;
declare const window: any;

export const TutorialContainer = (props) => {

	// Fetch the content
	const setContent = async () => {
		const slug = props.match.params.slug;
		const ts = new TutorialService();
		const tutorial = await ts.getTutorial(slug);
		setTutorial(tutorial);
	};


	let data: Tutorial;

	if (__isBrowser__) {
		data = window.__INITIAL_DATA__.tutorial || {};
	}
	else data = props.staticContext.tutorial;

	const [tutorial, setTutorial] = useState(data);

	useEffect(() => {
		if (!tutorial.title) setContent();

	}, []);

	if (!tutorial.title) return '';

	return (<TutorialPage tutorial={tutorial} />
	)
}
{/*  */ }
