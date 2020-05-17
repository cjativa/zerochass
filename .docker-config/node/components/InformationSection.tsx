import Link from 'next/link';
import logo from '../assets/logo.svg';

export const InformationSection = () => {
    return (
        <div className="information-banner">
            <div className="inner-content">
                <div className="left-content">
                    <div className="brand-logo">
                        <img src={logo} />
                    </div>
                    <div className="brand-support">
                        <h3 className="brand-text">zerochass</h3>
                        <p className="top">practical and goal-oriented resources</p>
                        <p className="top small-text">learn by doing. enjoy what you do.</p>
                    </div>
                </div>

                <div className="right-content">
                    <div className="info-list">
                        <ul>
                            <li><Link href="/"><a className="link link-bold">Zerochass</a></Link></li>
                            <li><Link href="/about"><a className="link">About</a></Link></li>
                            <li><Link href="/contact"><a className="link">Contact</a></Link></li>
                        </ul>
                        {/* <ul>
								<li><Link to="/register" className="link link-bold"> Register</Link></li>
								<li><Link to="/profile" className="link">Profile</Link></li>
							</ul> */}
                    </div>
                </div>
            </div>
        </div>
    )
};