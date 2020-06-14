import { useState, useContext } from 'react';
import Link from 'next/link';

import logo from '../../assets/logo.svg';
import { AuthenticationContext } from '../Layout';
import { AuthenticationDialog } from './authenticationDialog';


export const NavigationBar = (props) => {

    const { isAuthenticated, profileImageUrl } = useContext(AuthenticationContext);

    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(null);
    const [showModal, setShowModal] = useState(null);

    const toggleMenu = (event) => {
        event.preventDefault();

        const updatedMenuExpanded = !mobileMenuExpanded;
        setMobileMenuExpanded(updatedMenuExpanded);
    };

    const checkForMenu = (event) => {
        if (event.target.id !== 'search-input') toggleMenu(event);
    };

    const toggleModal = () => {
        const updatedShowModal = !showModal;
        setShowModal(updatedShowModal);
    };

    const triggerLogout = async () => {
        await fetch('/api/logout');
        window.location.reload();
    };

    const show = (mobileMenuExpanded) ? 'show' : 'hide';

    return (
        <nav className={`navigation-bar`}>

            {/** The main buttons */}
            <div className="navigation-bar__main" onClick={(mobileMenuExpanded) ? checkForMenu : null}>

                {/* Logo container */}
                <Link href="/">
                    <a className="main__logo">
                        <img src={logo} className="main__ico" />
                        <span className="main__brand">Zerochass</span>
                    </a>
                </Link>

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
                    <Link href="/dashboard"><a className="main__link">Dashboard</a></Link>
                    <Link href="/planner"><a className="main__link">Planner</a></Link>
                    <Link href="/profile"><a className="main__link">Profile</a></Link>
                    <Link href="/account"><a className="main__link">Account</a></Link>
                    <button className="main__link" onClick={(e) => triggerLogout()}>Sign out</button>

                </div>
            }

            {
                !isAuthenticated &&
                <div className={`main__links ${show}`} onClick={toggleMenu}>
                    <button className="main__link" onClick={(e) => toggleModal()}>Login / Sign Up</button>
                </div>
            }

            {/* Overlay to show when menu is expanded */}
            {mobileMenuExpanded && <div className={`main__overlay ${show}`} onClick={toggleMenu} />}

            {/** Show the authentication modal when necessary */}
            {showModal && <AuthenticationDialog isOpen={showModal} onRequestClose={() => toggleModal()} />}
        </nav >
    )
};





{/* <BaseDialog open={open} closeDialog={closeDialog} Dialog={dialog} /> */ }

/* if (open) {
    dialog = (dialogType === "login") ? <LoginDialog closeDialog={closeDialog} /> : <SignUpDialog closeDialog={closeDialog} />;
} */
