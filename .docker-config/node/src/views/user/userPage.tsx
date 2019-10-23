import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { Profile } from './profile';
import { Account } from './account';
import { Connect } from './connect';

import logo from '../../assets/logo/logo.svg';
import { AccountInformation, ProfileInformation } from '../../interfaces/userPayloads';

interface Props {
    route: string,

    profileInformation: ProfileInformation,
    accountInformation: AccountInformation,

    updateProfileInformation: (profileInformation: ProfileInformation) => void,
    updateAccountInformation: (accountInformation: AccountInformation) => void
}

export class UserPage extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {

        const { route, profileInformation, accountInformation, updateAccountInformation, updateProfileInformation } = this.props;

        return (
            <div className="user-page">
                <div className="page-content">
                    <nav>
                        <ul>
                            <li className="nav-link">
                                <img src={logo} />
                            </li>
                            <li>
                                <Link className={`nav-link ${(route === '/user/profile') ? 'active' : ''}`} to="/user/profile">Profile</Link>
                            </li>
                            <li>
                                <Link className={`nav-link ${(route === '/user/account') ? 'active' : ''}`} to="/user/account">Account</Link>
                            </li>
                            <li>
                                <Link className={`nav-link ${(route === '/user/connect') ? 'active' : ''}`} to="/user/connect">Connect</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="main-panel">
                        <div className="panel-content">
                            <Switch>
                                <Route path="/user/profile" render={() => <Profile profileInformation={profileInformation} updateProfileInformation={updateProfileInformation} />}></Route>
                                <Route path="/user/account" render={() => <Account accountInformation={accountInformation} updateAccountInformation={updateAccountInformation} />}></Route>
                                <Route path="/user/connect" component={Connect}></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}