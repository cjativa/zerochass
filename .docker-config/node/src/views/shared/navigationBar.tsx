import * as React from 'react';

import { Link } from 'react-router-dom';

import { LoginDialog } from '../dialogs/loginDialog';
import { SignUpDialog } from '../dialogs/signUpDialog';
import { BaseDialog } from '../dialogs/baseDialog';

import logo from '../../assets/logo/logo.svg';
import { UserMenu } from './userMenu';

import { logOut } from '../../store/actions/authenticationActions';

interface State {
    open: boolean,
    dialogType: string,
    mobileMenuExpanded: boolean
}

interface Props {
    signedIn: boolean,
    name: string,
}

class NavigationBar extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            dialogType: null,
            mobileMenuExpanded: false,
        }
    }

    openDialog = (dialogType: string) => {
        this.setState({ open: true, dialogType: dialogType });
    }

    closeDialog = () => {
        this.setState({ open: false });
    }

    toggleMenu = (event) => {
        event.preventDefault();

        this.setState({ mobileMenuExpanded: !this.state.mobileMenuExpanded });
    }

    logOut = (event) => {
        event.preventDefault();
        logOut();
    }

    checkForMenu = (event) => {
        if (event.target.id !== 'search-input') {
            this.toggleMenu(event);
        }
    }

    componentDidMount() {
        if (this.props.signedIn) {
            this.closeDialog();
        }
    }

    render() {

        const { signedIn, name } = this.props;
        const { open, dialogType, mobileMenuExpanded } = this.state;
        const { openDialog, closeDialog, toggleMenu, checkForMenu, logOut } = this;

        let dialog;

        const style = {
            height: '52px',
            width: '52px'
        };

        if (open) {
            dialog = (dialogType === "login") ? <LoginDialog closeDialog={closeDialog} /> : <SignUpDialog closeDialog={closeDialog} />;
        }

        return (
            <nav className="navigation-bar">

                <div className="main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                    {/* Logo container */}
                    <Link className="logo" to="/"><img src={logo} style={style} /><span className="brand-name">Zerochass</span></Link>

                    {/*  Navigation links */}
                    <ul className={(mobileMenuExpanded ? 'show' : '')}>
                        <li className="link">
                            <Link to="/tutorials">Tutorials</Link>
                        </li>
                        <li className="link">
                            <Link to="/projects">Projects</Link>
                        </li>
                        <li className="search">
                            <input id="search-input" className="search-input" placeholder="Search Zerochass" />
                        </li>

                        {/* Links to navigate to login and sign up on mobile, if not already logged in */}
                        {/* !signedIn &&
                            <>
                                <li className="link link-ctrl">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="link link-ctrl">
                                    <Link to="/sign-up">Sign up</Link>
                                </li>
                            </> */
                        }

                        {/* Buttons to trigger login and sign up dialogs on desktop, if not already logged in */}
                        {/* !signedIn &&
                            <>
                                <li className="dialog-ctrl">
                                    <button onClick={() => { openDialog('login') }}>Login</button>
                                </li>
                                <li className="dialog-ctrl">
                                    <button onClick={() => { openDialog('sign-up') }}>Sign up</button>
                                </li>
                            </> */
                        }

                        {/* Buttons to show upon user being signed in */}
                        {/* signedIn &&
                            <>
                                <li className="user-ctrl">
                                    <UserMenu />
                                </li>
                                <li>
                                    <button onClick={logOut}>Log Out</button>
                                </li>
                            </> */
                        }
                    </ul>

                    {/* Menu button container*/}
                    <a id="menu-btn" className="menu-btn" href="javascript:void(0);" onClick={toggleMenu}><i className="fas fa-bars"></i></a>
                </div>

                {/* Overlay to show when menu is expanded */}
                {mobileMenuExpanded && <div className="overlay" onClick={toggleMenu} />}

                <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} />
            </nav>
        )
    }
}

export { NavigationBar };