import React, { useState, useEffect } from 'react';
import marked from 'marked'

import { getContentForSingle } from '../../services/singleService';
import { useSiteTitle } from '../../actions/useSiteTitle';

export const Contact = () => {

    const [title, setTitle] = useState(null);
    const [entryContent, setEntryContent] = useState(null);


    useEffect(() => {
        const fetchContent = async () => {
            // Fetch the content
            const content = await getContentForSingle('contact');

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
        };

        fetchContent();

    }, []);

    useSiteTitle(`Contact us`);

    return (
        <div className="contact single-page">
            {entryContent &&
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
            }
        </div>
    )
}