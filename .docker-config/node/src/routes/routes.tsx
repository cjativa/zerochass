import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Application } from '../App';
import { TutorialContainer } from '../containers/tutorialContainer';

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<>
					<Route path="/tutorial/:slug" component={TutorialContainer} />
					<Route exact path="/" component={Application} />
				</>
			</BrowserRouter>
		)
	}
}

export { Routes }