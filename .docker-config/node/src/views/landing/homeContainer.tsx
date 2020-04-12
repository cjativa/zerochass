import React, { useState, useEffect } from 'react';

import { SiteBanner } from 'views/landing/siteBanner';
import { ContentList } from './contentList';
import { TechnologiesBanner } from 'views/landing/technologiesBanner';
import { useSiteTitle } from 'actions/useSiteTitle';


export const HomeContainer = () => {

    console.log(`Home`);
    useSiteTitle('Home');


    return (
        <>
            <SiteBanner />
            <ContentList />
            {/* <TechnologiesBannerContainer /> */}
        </>
    );
}

