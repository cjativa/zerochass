import React, { useState, useEffect } from 'react';
import { getContentForSingle } from '../../services/singleService';
import marked from 'marked'

export const About = () => {

    const [aboutContent, setAboutContent] = useState(null);

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
            setAboutContent(content);
        };

        fetchContent();

    }, []);


    return (
        <div className="about single-page">
            {aboutContent &&
                <div className="body">
                    {aboutContent.entryContent.map((block, index) => {
                        return (
                            <div key={index} className="section-content">
                                <h1 className="title">{block.sectionTitle}</h1>
                                <p dangerouslySetInnerHTML={{ __html: block.sectionContent }} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}