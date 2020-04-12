import React, { useState, useEffect } from 'react';
import marked from 'marked'
import useMetaTags from 'react-metatags-hook';

import { getContentForSingle } from '../../services/singleService';

export const About = () => {

    const [title, setTitle] = useState(null);
    const [entryContent, setEntryContent] = useState([]);
    const [slug, setSlug] = useState(null);

    useEffect(() => {

        const fetchContent = async () => {
            // Fetch the content
            const content = await getContentForSingle('about');

            // Apply markdown to each entry content block
            content.entryContent = content.entryContent.map((content) => {
                return {
                    ...content,
                    sectionContent: marked(content.sectionContent)
                }
            });

            // Set to state
            setTitle(content.title);
            setEntryContent(content.entryContent);
            setSlug(content.slug);
        };

        fetchContent();

    }, []);

    const pageTitle = `${title} | Zerochass`;
    const keywords = `contact, help, questions, contact us`;
    const summary = entryContent.map((e, i) => {
        if (i == 0) return `${e.sectionTitle} ${e.sectionContent}`.replace(/<[^>]*>/g, '')
    }).join(' ').trim();

    useMetaTags({
        title: pageTitle,
        description: summary,
        charset: 'utf8',
        lang: 'en',
        metas: [
            { name: 'keywords', content: keywords },
            { name: 'robots', content: 'index, follow' },
            { name: 'url', content: `${process.env.REACT_APP_SITE_URL}/${slug}` }
        ],
        twitter: {
            card: summary,
            creator: '@zerochass',
            title: pageTitle,
        }
    });

    return (
        <div className="about single-page">
            <div className="body">
                {entryContent.map((block, index) => {
                    return (
                        <div key={index} className="section-content">
                            <h1 className="title">{block.sectionTitle}</h1>
                            <div dangerouslySetInnerHTML={{ __html: block.sectionContent }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}