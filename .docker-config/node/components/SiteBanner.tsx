import Link from 'next/link';

export const SiteBanner = () => {
    return (
        <div className="site-banner">
            <div className="content">
                <div className="heading-container">
                    <p className="header">learn. code. and innovate</p>
                    <p className="subheader">practical and goal-oriented resources</p>
                </div>
                <div className="button-container">
                    <Link href="/tutorials"><a className="browse-btn">BROWSE TUTORIALS</a></Link>
                    {/* <Link className="join-btn" to="/sign-up">JOIN ZEROCHASS</Link> */}
                </div>
            </div>
        </div>
    )
}