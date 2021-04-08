import { useContext } from 'react';

import { Button } from '../../../components/button/button';
import { AuthenticationContext } from '../../../components/contexts';

export const SiteBanner = () => {

    const { isAuthenticated, profileImageUrl, toggleAuthenticationModal } = useContext(AuthenticationContext);


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
                    <Button
                        style="secondary"
                        asLink={true}
                        path="tutorials"
                    >
                        Browse and read
                    </Button>

                    {/** Display the wrting button */}
                    {
                        (isAuthenticated)
                            // When authenticated, it should link to the write page
                            ? <Button
                                style={'primary'}
                                asLink={true}
                                path="write"

                            >
                                Start Writing
                        </Button>

                            // Otherwise, should display authentication modal
                            : <Button
                                style={'primary'}
                                onClick={toggleAuthenticationModal}
                            >
                                Start writing!
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}