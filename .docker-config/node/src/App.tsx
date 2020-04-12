import * as React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedNavigationBarContainer } from 'containers/navigationBarContainer';
import { HomeContainer } from 'views/landing/homeContainer';
import { TutorialList } from 'views/tutorialsList/tutorialList';
import { TutorialContainer } from 'containers/tutorialContainer';
import { InformationBanner } from 'views/shared/informationBanner';
import { Footer } from 'views/shared/footer';
import { About } from 'views/singles/about';
import { Contact } from 'views/singles/contact';


// Eventual authentication components
import { LoginContainer } from 'containers/authentication/loginContainer';
import { SignUpContainer } from 'containers/authentication/signUpContainer';
import { UserPageContainer } from 'containers/user/userPageContainer';
import { useSiteTitle } from 'actions/useSiteTitle';

export const Application = () => {

  return (
    <div className="App" id="App">
      <BrowserRouter>
        <>
          <Switch>
            <Route path={'/'} children={() => {
              return (
                <>
                  <ConnectedNavigationBarContainer />
                  <div className="app__body">
                    <Switch>
                      <Route exact path="/" component={HomeContainer} />
                      <Route path='/tutorial/:slug' component={TutorialContainer} />
                      <Route path='/tutorials/' component={TutorialList} />
                      <Route path='/about' component={About} />
                      <Route path='/contact' component={Contact} />
                      {/* <Route path="/user" component={UserPageContainer} /> */}
                    </Switch>
                  </div>
                </>
              );
            }} />
          </Switch>
          <InformationBanner />
          <Footer />
        </>
      </BrowserRouter>
    </div >
  );
};


{/* Routes that don't display the navigation bar, information banner, and footer */ }
{/* <Route path="/login" component={LoginContainer} /> */ }
{/* <Route path="/sign-up" component={SignUpContainer} /> */ }

{/* Routes that do display the normal navigation bar, information banner, and footer */ }