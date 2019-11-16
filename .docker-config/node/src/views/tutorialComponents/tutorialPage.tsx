import * as React from "react";

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
	sectionInformation: { title: string, id: string, sectionComplete: boolean }[],
}

class TutorialPage extends React.Component<Props, State> {

	sectionRefs: any[];
	previousEntry: any;
	nextEntry: any;

	constructor(props) {
		super(props);

		this.state = {
			sectionInformation: [],
		}

		this.sectionRefs = [];
	}

	componentDidMount = () => {
		this.parseContentSections();

		if (this.props.tutorial.hasOwnProperty('parent')) {
			this.setupTutorialSeries();
		}
	}

	parseContentSections = () => {

		const { tutorialContent } = this.props.tutorial;
		const sectionInformation: State["sectionInformation"] = [];

		tutorialContent.forEach((section) => {

			const { sectionTitle: title } = section;
			const id = this.slugify(title);
			const meta = { title, id, sectionComplete: false };

			this.sectionRefs.push(React.createRef());
			sectionInformation.push(meta);
		});

		this.setState({ sectionInformation });
	}

	setupTutorialSeries = () => {
		const entries = this.props.tutorial.parent.children;

		// Locate this entry in the entries list
		const thisEntryIndex = entries.findIndex((entry) => {
			return this.props.tutorial.id === entry.id;
		});

		// Check if a previous entry would exist
		if (entries[thisEntryIndex - 1]) {

			// Get the title and slug
			const { title } = entries[thisEntryIndex - 1];
			const link = this.slugify(title);

			this.previousEntry = { title, link };
		}

		// Check if a next entry would exist
		if (entries[thisEntryIndex + 1]) {

			// Get the title and slug
			const { title } = entries[thisEntryIndex + 1];
			const link = this.slugify(title);

			this.nextEntry = { title, link };
		}
	}

	onProgressClick = (index: number) => {
		const nextIndex = index + 1;
		if (nextIndex !== this.state.sectionInformation.length) {
			this.sectionRefs[nextIndex].current.scrollIntoView({ behavior: "smooth" });
		}

		const sectionInformation = [...this.state.sectionInformation];
		sectionInformation[index].sectionComplete = !sectionInformation[index].sectionComplete;

		this.setState((previousState) => {
			return {
				...previousState,
				sectionInformation
			}
		});
	}

	slugify = (text) => {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	}

	render() {

		const { title, tags, featuredImage, color, tutorialContent } = this.props.tutorial;
		const { onProgressClick, previousEntry, nextEntry } = this;
		const { sectionInformation } = this.state;

		return (
			<div className="tutorial-page">

				<div className="tutorial-content">

					{/* Display tutorial header */}
					<Header title={title} tags={tags} featuredImage={featuredImage} color={color} />

					<div className="content-grid">

						{/* Display the content sections */}
						<div className="sections">
							{sectionInformation.length > 0 && tutorialContent.map((content, index) => {

								const sectionComplete = sectionInformation[index].sectionComplete;

								// Slugify the title
								const id = this.slugify(content.sectionTitle);

								// Build the Progress Check component
								const progressCheck = (
									<ProgressCheck index={index} onProgressClick={onProgressClick} sectionComplete={sectionComplete} />
								)

								// Return the composed Section component
								return (
									<div key={index} ref={this.sectionRefs[index]}>
										<Section content={content} key={index} index={index} id={id} progressCheck={progressCheck} />
									</div>
								);
							})}
						</div>

						{/** Display the related entries */}
						<div className="related-entries">
							<RelatedNavigator nextEntry={nextEntry} previousEntry={previousEntry} />
						</div>

						{/** Display the side bar */}
						<div className="side-bar-column">
							{/* Display the content bar */}
							<ContentBar sectionInformation={sectionInformation} />

							{/** Display the share bar */}
							<ShareBar tutorialTitle={title} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { TutorialPage };
