import { useContext, useState } from 'react';
import Link from 'next/link';

import { AuthenticationContext } from '../contexts';

export const SiteBanner = () => {

    const { isAuthenticated, profileImageUrl, toggleAuthenticationModal } = useContext(AuthenticationContext);

    const WriteButton = (isAuthenticated)
        ? <Link href="/write"><a className="btn btn--primary btn--sb">Start writing</a></Link>
        : <button onClick={() => toggleAuthenticationModal()} className="btn btn--primary btn--sb">Start writing</button>;


    return (
        <div className="site-banner">
            <div className="site-banner__inner">

                {/** Banner Heading */}
                <div className="site-banner__header">
                    <p className="sb-header">learn. build. and write</p>
                    <p className="sb-subheader">practical and goal-oriented resources for all by all</p>
                </div>

                {/** Banner Buttons */}
                <div className="site-banner__buttons">
                    <Link href="/tutorials">
                        <a className="btn btn--secondary btn--sb">Browse and read</a>
                    </Link>
                    {WriteButton}
                </div>

            </div>
        </div>
    )
}