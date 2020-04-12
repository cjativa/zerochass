import React, { useState, useEffect } from 'react';
import useMetaTags from 'react-metatags-hook';

import { SiteBanner } from 'views/landing/siteBanner';
import { ContentList } from './contentList';
import { TechnologiesBanner } from 'views/landing/technologiesBanner';
import { useSiteTitle } from 'actions/useSiteTitle';


export const HomeContainer = () => {

    const pageTitle = `Home | Zerochass`;
    const summary = `Zerochass is an online learning platform, where you can learn more about software engineering and web development. Here you'll find quick and bite-size tutorials about React, TypeScript, JavaScript, NodeJS, and much more regarding software engineering and web development`; 
    const keywords = `zerochass, company, coding, programming, tutorials, javascript, typescript, software engineering, web development, free`;

    useMetaTags({
        title: pageTitle,
        description: summary,
        charset: 'utf8',
        lang: 'en',
        metas: [
            { name: 'keywords', content: keywords },
            { name: 'robots', content: 'index, follow' },
            { name: 'url', content: `${process.env.REACT_APP_SITE_URL}/` },

            { name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:site', content: '@zerochass' },
			{ name: 'twitter:title', content: pageTitle, },
			{ name: 'twitter:description', content: summary },
        ]
    });


    return (
        <>
            <SiteBanner />
            <ContentList />
            {/* <TechnologiesBannerContainer /> */}
        </>
    );
}

