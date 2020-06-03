import { useState, useContext } from 'react';
import Link from 'next/link';

import { AuthenticationContext } from './Layout';
import logo from '../assets/logo.svg';
import { AuthenticationDialog } from './authenticationDialog';


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

    const triggerLogout = async () => {
        await fetch('/api/logout');
        window.location.reload();
    };

    const { tutorial } = props;
    const show = (mobileMenuExpanded) ? 'show' : 'hide';
    const { isAuthenticated, profileImageUrl } = useContext(AuthenticationContext);

    return (
        <nav className={`navigation-bar`}>

            {/** The main buttons */}
            <div className="navigation-bar__main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                {/* Logo container */}
                <a className="main__logo" onClick={() => location.assign('/')}>
                    <img src={logo} className="main__ico" />
                    <span className="main__brand">Zerochass</span>
                </a>

                {/** Tutorials link */}
                <div className="main__middle">
                    <Link href="/tutorials"><a className="main__link">Tutorials</a></Link>
                </div>

                <div className="main__end">
                    {/* Menu button container*/}
                    <a id="menu-btn" className="main__menu-btn" onClick={toggleMenu}>
                        {
                            (isAuthenticated)
                                ? <img src={profileImageUrl} className="main__profile" />
                                : <i className="fas fa-bars"></i>
                        }
                    </a>
                </div>
            </div>



            {/*  Navigation links */}
            {isAuthenticated &&
                <div className={`main__links ${show}`} onClick={toggleMenu}>

                    {/** Login link / Profile link */}
                    <Link href="/profile"><a className="main__link">Profile</a></Link>
                    <Link href="/account"><a className="main__link">Account</a></Link>
                    <button className="main__link" onClick={(e) => triggerLogout()}>Sign out</button>

                </div>
            }

            {
                !isAuthenticated &&
                <div className={`main__links ${show}`} onClick={toggleMenu}>
                    <button className="main__link" onClick={(e) => toggleModal('LOGIN_MODAL')}>Login / Sign Up</button>
                </div>
            }

            {/* Overlay to show when menu is expanded */}
            {mobileMenuExpanded && <div className={`main__overlay ${show}`} onClick={toggleMenu} />}

            {/** Show the authentication modal when necessary */}
            {showModal && <AuthenticationDialog modalType={modalType} isOpen={showModal} onRequestClose={() => toggleModal()} />}
        </nav >
    )
};





{/* <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} /> */ }

/* if (open) {
    dialog = (dialogType === "login") ? <LoginDialog closeDialog={closeDialog} /> : <SignUpDialog closeDialog={closeDialog} />;
} */
