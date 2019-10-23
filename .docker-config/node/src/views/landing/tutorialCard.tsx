import * as React from "react";

import { Tutorial } from "interfaces/tutorial";

interface Props {
	tutorial: Tutorial;
}

class TutorialCard extends React.Component<Props> {

	render() {
		const { tutorial } = this.props;
		const { color } = tutorial;

		return (
			<div className={`tutorial-card`}>
				{<a href={`/tutorial/${tutorial.slug}`} className={`${color.toLowerCase()}`}>
					<h1>{tutorial.title}</h1>
					<p className="description">{tutorial.description[0].firstLine}</p>
					<p className="description">{tutorial.description[0].secondLine}</p>
				</a>}
			</div>
		);
	}

}
export { TutorialCard };