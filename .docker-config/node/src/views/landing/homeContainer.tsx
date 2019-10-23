import * as React from 'react';
import logo from './logo.svg';

import { SiteBannerContainer } from 'containers/siteBanner';
import { ContentList } from './contentList';
import { TechnologiesBannerContainer } from 'containers/technologiesBanner';


class HomeContainer extends React.Component {

    render() {
        return (
            <>
                <SiteBannerContainer />
                <ContentList />
                {/* <TechnologiesBannerContainer /> */}
            </>
        );
    }
}

export { HomeContainer };
