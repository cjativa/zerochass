import * as React from 'react';

import { Link } from 'react-router-dom';

class SiteBanner extends React.Component {

    render() {

        return (
            <div className="site-banner">
                <div className="content">
                    <div className="heading-container">
                        <p className="header">learn. code. and innovate</p>
                        <p className="subheader">practical and goal-oriented resources</p>
                    </div>
                    <div className="button-container">
                        <Link className="browse-btn" to="/tutorials">BROWSE TUTORIALS</Link>
                        {/* <Link className="join-btn" to="/sign-up">JOIN ZEROCHASS</Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export { SiteBanner };