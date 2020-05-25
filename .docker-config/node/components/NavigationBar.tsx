import { useState } from 'react';
import Link from 'next/link';

import logo from '../assets/logo.svg';
import { AuthenticationDialog } from './authenticationDialog';
import { TutorialCard } from './TutorialCard';

interface State {
    open: boolean,
    dialogType: string,
    mobileMenuExpanded: boolean
}

/* this.state = {
    open: false,
    dialogType: null,
    mobileMenuExpanded: false,
} */

export const NavigationBar = (props) => {

    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [modalType, setModalType] = useState(null);

    const toggleMenu = (event) => {
        event.preventDefault();

        const updatedMenuExpanded = !mobileMenuExpanded;
        setMobileMenuExpanded(updatedMenuExpanded);
    };

    const checkForMenu = (event) => {
        if (event.target.id !== 'search-input') toggleMenu(event);
    };

    const toggleModal = (type?: 'LOGIN_MODAL' | 'SIGN_UP_MODAL') => {

        // If we have a type, it means modal should be displayed
        if (type) {
            const updatedShowModal = !showModal;
            setModalType(type);
            setShowModal(updatedShowModal);
        }

        else setShowModal(false);

    };

    /* const { signedIn, name } = this.props; */
    /* const { open, dialogType } = this.state; */
    /* const { openDialog, closeDialog, toggleMenu, checkForMenu, logOut } = this; */
    const { tutorial } = props;
    const show = (mobileMenuExpanded) ? 'show' : 'hide';
    let dialog;

    const style = {
        height: '52px',
        width: '52px'
    };

    return (
        <nav className={`navigation-bar`}>

            {/** The main buttons */}
            <div className="navigation-bar__main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                {/* Logo container */}
                <a className="main__logo" onClick={() => location.assign('/')}>
                    <img src={logo} style={style} />
                    <span className="main__brand">Zerochass</span>
                </a>

                {/* Menu button container*/}
                <a id="menu-btn" className="main__menu-btn" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </a>
            </div>

            {/* Overlay to show when menu is expanded */}
            {mobileMenuExpanded && <div className={`main__overlay ${show}`} onClick={() => console.log(`Clicked`)} />}

            {/*  Navigation links */}
            <ul className={`main__links ${show}`}>

                {/** Tutorials link */}
                <li className="start">
                    <Link href="/tutorials"><a className="main__link">Tutorials</a></Link>
                </li>

                {/** Login link */}
                <li className="end">
                    <button className="main__link" onClick={(e) => toggleModal('LOGIN_MODAL')}>Login</button>
                </li>

                {/** Featured tutorial for mobile */}
                <li className="featured">
                    <div className={`main__link feat`}>
                        {tutorial &&
                            <div className="featured-container">
                                <TutorialCard tutorial={tutorial} large />
                                <p className="featured-container__text">Tutorial of the day</p>
                            </div>
                        }
                    </div>
                </li>
            </ul>

            {/** Show the authentication modal when necessary */}
            {showModal && <AuthenticationDialog modalType={modalType} isOpen={showModal} onRequestClose={() => toggleModal()} />}
        </nav>
    )
};





{/* <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} /> */ }

/* if (open) {
    dialog = (dialogType === "login") ? <LoginDialog closeDialog={closeDialog} /> : <SignUpDialog closeDialog={closeDialog} />;
} */
