import React from 'react';
import Link from 'next/link';

import logo from '../assets/logo.svg';
import { TutorialCard } from './TutorialCard';

interface State {
    open: boolean,
    dialogType: string,
    mobileMenuExpanded: boolean
}

export class NavigationBar extends React.Component<any, State> {

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
    }

    checkForMenu = (event) => {
        if (event.target.id !== 'search-input') {
            this.toggleMenu(event);
        }
    }

    async componentDidMount() {
        /* if (this.props.signedIn) {
            this.closeDialog();
        } */
    }

    goToTwitter = () => {
        window.open(`twitter.com/zerochass`, '_blank');
    }

    render() {

        /* const { signedIn, name } = this.props; */
        const { open, dialogType, mobileMenuExpanded } = this.state;
        const { openDialog, closeDialog, toggleMenu, checkForMenu, logOut } = this;
        const { tutorial } = this.props;
        const show = (mobileMenuExpanded) ? 'show' : '';
        let dialog;

        const style = {
            height: '52px',
            width: '52px'
        };

        return (
            <nav className="navigation-bar">
                <div className="navigation-bar__main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                    {/* Logo container */}
                    <a className="main__logo" onClick={() => location.assign('/')}>
                        <img src={logo} style={style} />
                        <span className="main__brand">Zerochass</span>
                    </a>

                    {/*  Navigation links */}
                    <ul className={`main__links ${show}`}>
                        <li>
                            <Link href="/tutorials"><a className="main__link">Tutorials</a></Link>
                        </li>
                        <li>
                            <div className="main__link featured">
                                <div className="featured-container">
                                    {tutorial && <TutorialCard tutorial={tutorial} /* large */ />}
                                </div>
                            </div>
                        </li>
                    </ul>


                    {/* Menu button container*/}
                    <a id="menu-btn" className="main__menu-btn" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </a>
                </div>

                {/* Overlay to show when menu is expanded */}
                {mobileMenuExpanded && <div className="main__overlay" onClick={toggleMenu} />}
            </nav>
        )
    }
};





{/* <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} /> */ }

/* if (open) {
    dialog = (dialogType === "login") ? <LoginDialog closeDialog={closeDialog} /> : <SignUpDialog closeDialog={closeDialog} />;
} */
