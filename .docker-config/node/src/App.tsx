import React from 'react';


import { Route, Switch } from 'react-router-dom';
import { UseScrollToTop } from './actions/useScrollToTop';
import { ConnectedNavigationBarContainer } from './containers/navigationBarContainer';

import { InformationBanner } from './views/shared/informationBanner';
import { Footer } from './views/shared/footer';


// Eventual authentication components
import { routes } from '../shared/routes';
import './styles/styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';




export const Application = () => {

  return (
    <>
      <ConnectedNavigationBarContainer />
      <div className="app__body">
        <UseScrollToTop />
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