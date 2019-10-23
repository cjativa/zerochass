import * as React from "react";

import { Tutorial } from "interfaces/tutorial";

import { Header } from 'views/tutorialComponents/header';
import { Section } from 'views/tutorialComponents/section';
import { ContentBar } from 'views/tutorialComponents/contentBar';

interface Props {
	tutorial: Tutorial;
}

interface State {
	sectionInformation: any,
}

class TutorialPage extends React.Component<Props, State> {

	constructor(props) {
		super(props);

		this.state = {
			sectionInformation: [],
		}
	}

	componentDidMount = () => {
		this.parseContentSections();
	}

	parseContentSections = () => {

		const { tutorialContent } = this.props.tutorial;
		const sectionInformation = [];

		tutorialContent.forEach((section) => {

			const { sectionTitle: title } = section;
;
			const meta = { title, id: title };
			sectionInformation.push(meta);
		});
		this.setState({ sectionInformation });
	}

	render() {

		const { title, tags, featuredImage, color, tutorialContent } = this.props.tutorial;
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
								return (<Section content={content} key={index} />);
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
