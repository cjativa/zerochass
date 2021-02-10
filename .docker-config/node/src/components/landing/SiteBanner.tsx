import { useContext, useState } from 'react';
import Link from 'next/link';

import { AuthenticationContext } from '../contexts';

export const SiteBanner = () => {

    const { isAuthenticated, profileImageUrl, toggleAuthenticationModal } = useContext(AuthenticationContext);

    const WriteButton = (isAuthenticated)
        ? <Link href="/write"><a className="btn btn--primary btn--sb">WRITE YOUR OWN</a></Link>
        : <button onClick={() => toggleAuthenticationModal()} className="btn btn--primary btn--sb">WRITE YOUR OWN</button>;


    return (
        <div className="site-banner">
            <div className="content">

                {/** Banner Heading */}
                <div className="heading-container">
                    <p className="header">learn. code. and innovate</p>
                    <p className="subheader">practical and goal-oriented resources</p>
                </div>

                {/** Banner Buttons */}
                <div className="button-container">
                    <Link href="/tutorials"><a className="btn btn--secondary btn--sb">BROWSE TUTORIALS</a></Link>
                    {WriteButton}
                </div>

                {/** Featured tutorial for mobile */}
                {/* <li className="featured">
                    <div className={`main__link feat`}>
                        {tutorial &&
                            <div className="featured-container">
                                <TutorialCard tutorial={tutorial} large />
                                <p className="featured-container__text">Tutorial of the day</p>
                            </div>
                        }
                    </div>
                </li> */}
            </div>
        </div>
    )
}