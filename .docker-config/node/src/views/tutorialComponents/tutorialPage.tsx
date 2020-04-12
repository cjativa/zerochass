import React, { useEffect, useState, useRef, createRef } from "react";

import { Tutorial } from "interfaces/tutorial";

import { Header } from 'views/tutorialComponents/header';
import { Section } from 'views/tutorialComponents/section';
import { ContentBar } from 'views/tutorialComponents/contentBar';
import { ShareBar } from 'views/tutorialComponents/shareBar';
import { ProgressCheck } from "./progressCheck";
import { RelatedNavigator } from "./relatedNavigator";

interface Props {
	tutorial: Tutorial;
}

interface State {
	sectionInformation: {
		title: string, id: string,
		sectionComplete: boolean
	}[],
}

export const TutorialPage = (props: Props) => {

	let previousEntry: any;
	let nextEntry: any;

	const [sectionRefs, setSectionRefs] = useState([]);
	const [sectionInformation, setSectionInformation] = useState([]);

	/** Effects to occur on mount */
	useEffect(() => {
		parseContentSections();

		if (props.tutorial.hasOwnProperty('parent')) {
			setupTutorialSeries();
		}
	}, []);

	/** Effects to occur when section information changes */
	useEffect(() => {
		console.log(`Section information changed`);

		// Add refs
		const refs = sectionInformation.map((s, i) => sectionRefs[i] || createRef());

		// Set the refs
		setSectionRefs(refs);

	}, [sectionInformation]);

	const parseContentSections = () => {

		const { tutorialContent } = props.tutorial;
		const sectionInformation: State["sectionInformation"] = [];

		tutorialContent.forEach((section) => {

			const { sectionTitle: title } = section;
			const id = slugify(title);
			const meta = { title, id, sectionComplete: false };

			sectionInformation.push(meta);
		});


		setSectionInformation(sectionInformation);
	}

	const setupTutorialSeries = () => {
		const entries = props.tutorial.parent.children;

		// Locate this entry in the entries list
		const thisEntryIndex = entries.findIndex((entry) => {
			return props.tutorial.id === entry.id;
		});

		// Check if a previous entry would exist
		if (entries[thisEntryIndex - 1]) {

			// Get the title and slug
			const { title } = entries[thisEntryIndex - 1];
			const link = slugify(title);

			previousEntry = { title, link };
		}

		// Check if a next entry would exist
		if (entries[thisEntryIndex + 1]) {

			// Get the title and slug
			const { title } = entries[thisEntryIndex + 1];
			const link = slugify(title);

			nextEntry = { title, link };
		}
	}

	const onProgressClick = (index: number) => {
		const nextIndex = index + 1;
		console.log(sectionRefs);
		if (nextIndex !== sectionInformation.length) {
			sectionRefs[nextIndex].current.scrollIntoView({ behavior: "smooth" });
		}

		const sections = [...sectionInformation];
		sections[index].sectionComplete = !sections[index].sectionComplete;

		setSectionInformation(sections);
	}

	const slugify = (text) => {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	}

	const { title, tags, featuredImage, color, tutorialContent } = props.tutorial;

	if (title) document.title = `${title} | Zerochass`;

	console.log(sectionRefs);

	return (
		<div className="tutorial-page">

			{/* Header section containing the tutorial image and title */}
			<div className="tutorial-page__header">
				<Header title={title} tags={tags} featuredImage={featuredImage} color={color} />
			</div>

			{/** Body section containing the tutorial content and share bars, sections, and related tutorials */}
			<div className="tutorial-page__body">

				{/** Display the side bar */}
				<div className="side-bar-column">
					{/* Display the content bar */}
					<ContentBar sectionInformation={sectionInformation} />

					{/** Display the share bar */}
					<ShareBar tutorialTitle={title} />
				</div>

				{/* Display the content sections */}
				<div className="sections">
					{sectionInformation.length > 0 && tutorialContent.map((content, index) => {

						const sectionComplete = sectionInformation[index].sectionComplete;

						// Slugify the title
						const id = slugify(content.sectionTitle);

						// Build the Progress Check component
						const progressCheck = <ProgressCheck index={index} onProgressClick={onProgressClick} sectionComplete={sectionComplete} />

						// Return the composed Section component
						return (
							<div className="section-item" key={index} ref={sectionRefs[index]}>
								<Section content={content} key={index} index={index} id={id} progressCheck={progressCheck} />
							</div>
						);
					})}
				</div>

				{/** Display the related entries */}
				<div className="related-entries">
					<RelatedNavigator nextEntry={nextEntry} previousEntry={previousEntry} />
				</div>

			</div>
		</div>
	);
};