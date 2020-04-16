import * as React from 'react';

import { Link } from 'react-router-dom';

import { LoginDialog } from '../dialogs/loginDialog';
import { SignUpDialog } from '../dialogs/signUpDialog';
import { BaseDialog } from '../dialogs/baseDialog';

import logo from '../../assets/logo/logo.svg' ;
import { UserMenu } from './userMenu';

import { logOut } from '../../store/actions/authenticationActions';

interface State {
    open: boolean,
    dialogType: string,
    mobileMenuExpanded: boolean
}

interface Props {
    //signedIn: boolean,
    //name: string,
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
        /* if (this.props.signedIn) {
            this.closeDialog();
        } */
    }

    render() {

        /* const { signedIn, name } = this.props; */
        const { open, dialogType, mobileMenuExpanded } = this.state;
        const { openDialog, closeDialog, toggleMenu, checkForMenu, logOut } = this;
        const show = (mobileMenuExpanded) ? 'show' : '';
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
                <div className="navigation-bar__main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                    {/* Logo container */}
                    <Link className="main__logo" to="/">
                        <img src={logo} style={style} />
                        <span className="main__brand">Zerochass</span>
                    </Link>

                    {/*  Navigation links */}
                    <ul className={`main__links ${show}`}>
                        <li>
                            <Link className="main__link" to="/tutorials">Tutorials</Link>
                        </li>
                        <li>
                            <Link className="main__link" to="/projects">Projects</Link>
                        </li>
                    </ul>


                    {/* Menu button container*/}
                    <a id="menu-btn" className="main__menu-btn"/*  href="javascript:void(0);" */ onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </a>
                </div>

                {/* Overlay to show when menu is expanded */}
                {mobileMenuExpanded && <div className="main__overlay" onClick={toggleMenu} />}

                <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} />
            </nav>
        )
    }
}

export { NavigationBar };