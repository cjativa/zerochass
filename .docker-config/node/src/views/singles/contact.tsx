import React, { useState, useEffect } from 'react';
import marked from 'marked';
import useMetaTags from 'react-metatags-hook';


import { getContentForSingle } from '../../services/singleService';
import { useSiteTitle } from '../../actions/useSiteTitle';

declare const __isBrowser__: string;
declare const window: any;

export const Contact = (props) => {

    // Fetch the content
    const setContent = async () => {
        const contact = await getContentForSingle('contact');
        const { title, entryContent, slug } = contact;
        setTitle(title);
        setEntryContent(entryContent);
        setSlug(slug);
    };

    let contact = null;

    if (__isBrowser__) contact = window.__INITIAL_DATA__.contact || {};
    else contact = props.staticContext.contact;

    const [title, setTitle] = useState(contact.title);
    const [slug, setSlug] = useState(contact.slug);
    const [entryContent, setEntryContent] = useState(contact.entryContent);


    useEffect(() => {
        if (!title) {
            setContent();
        }
    }, []);

    const pageTitle = `${title} | Zerochass`;
    const keywords = `contact, help, questions, contact us`;
    const summary = entryContent && entryContent.map((e, i) => {
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
            { name: 'url', content: `${process.env.CANONICAL_ROOT}/${slug}` },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@zerochass' },
            { name: 'twitter:title', content: pageTitle, },
            { name: 'twitter:description', content: summary },
        ],
    });

    return (
        <div className="contact single-page">
            {entryContent &&
                <div className="body">
                    {entryContent.map((block, index) => {
                        const sectionContent = marked(block.sectionContent);
                        return (
                            <div key={index} className="section-content">
                                <h1 className="title">{block.sectionTitle}</h1>
                                <div dangerouslySetInnerHTML={{ __html: sectionContent }} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};