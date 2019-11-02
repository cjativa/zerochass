import * as React from "react";

import { Tutorial } from "interfaces/tutorial";

import { Header } from 'views/tutorialComponents/header';
import { Section } from 'views/tutorialComponents/section';
import { ContentBar } from 'views/tutorialComponents/contentBar';

interface Props {
	tutorial: Tutorial;
}

interface State {
	sectionInformation: { title: string, id: string }[],
}

class TutorialPage extends React.Component<Props, State> {

	sectionRefs: any[];

	constructor(props) {
		super(props);

		this.state = {
			sectionInformation: [],
		}

		this.sectionRefs = [];
	}

	componentDidMount = () => {
		this.parseContentSections();
	}

	parseContentSections = () => {

		const { tutorialContent } = this.props.tutorial;
		const sectionInformation = [];

		tutorialContent.forEach((section) => {

			const { sectionTitle: title } = section;
			const id = this.slugify(title);
			const meta = { title, id };

			this.sectionRefs.push(React.createRef());
			sectionInformation.push(meta);
		});

		this.setState({ sectionInformation });
	}

	onProgressClick = (index: number) => {
		index = index+1;
		if (index !== this.state.sectionInformation.length) {
			this.sectionRefs[index].current.scrollIntoView();
		}
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
		const { onProgressClick } = this;
		const { sectionInformation } = this.state;

		return (
			<div className="tutorial-page">

				<div className="tutorial-content">

					{/* Display tutorial header */}
					<Header title={title} tags={tags} featuredImage={featuredImage} color={color} />

					<div className="content-grid">

						{/* Display the content sections */}
						<div className="sections">
							{tutorialContent.map((content, index) => {
								const id = this.slugify(content.sectionTitle);
								return (
									<div key={index} ref={this.sectionRefs[index]}>
										<Section content={content} key={index} index={index} id={id} onProgressClick={onProgressClick} />
									</div>
								);
							})}
						</div>

						{/* Display the content bar */}
						<div className="content-bar-column">
							<ContentBar sectionInformation={sectionInformation} />
						</div>


					</div>
				</div>
			</div>
		);
	}
}

export { TutorialPage };
