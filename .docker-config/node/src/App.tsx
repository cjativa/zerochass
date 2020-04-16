import React from 'react';


import { Route, Switch } from 'react-router-dom';
import { ConnectedNavigationBarContainer } from './containers/navigationBarContainer';
import { HomeContainer } from './views/landing/homeContainer';
import { TutorialList } from './views/tutorialsList/tutorialList';
import { TutorialContainer } from './containers/tutorialContainer';
import { InformationBanner } from './views/shared/informationBanner';
import { Footer } from './views/shared/footer';
import { About } from './views/singles/about';
import { Contact } from './views/singles/contact';

// Eventual authentication components
import { LoginContainer } from './containers/authentication/loginContainer';
import { SignUpContainer } from './containers/authentication/signUpContainer';
import { UserPageContainer } from './containers/user/userPageContainer';
import { useSiteTitle } from './actions/useSiteTitle';
import { routes } from '../shared/routes';
import './styles/styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';




export const Application = () => {

  return (
    <>
      <ConnectedNavigationBarContainer />
      <div className="app__body">

        <Switch>
          {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <C {...props} {...rest} />
              )}
            />

          ))}
        </Switch>
        <InformationBanner />
        <Footer />
      </div>
    </>
  );
};