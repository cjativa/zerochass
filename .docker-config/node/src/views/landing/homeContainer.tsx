import React, { useState, useEffect } from 'react';

import { SiteBanner } from 'views/landing/siteBanner';
import { ContentList } from './contentList';
import { TechnologiesBanner } from 'views/landing/technologiesBanner';


export const HomeContainer = () => {
    return (
        <>
            <SiteBanner />
            <ContentList />
            {/* <TechnologiesBannerContainer /> */}
        </>
    );
}

