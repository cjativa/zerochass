import Link from 'next/link';

export const SiteBanner = () => {
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
                    <Link href="/tutorials"><a className="browse-btn">BROWSE TUTORIALS</a></Link>
                    <Link href="/write"><a className="write-btn">WRITE YOUR OWN</a></Link>
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