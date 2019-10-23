import React, { useState, useEffect } from 'react';

import { SiteBannerContainer } from 'containers/siteBanner';
import { ContentList } from './contentList';
import { TechnologiesBannerContainer } from 'containers/technologiesBanner';


export const HomeContainer = () => {
    return (
        <>
            <SiteBannerContainer />
            <ContentList />
            {/* <TechnologiesBannerContainer /> */}
        </>
    );
}

