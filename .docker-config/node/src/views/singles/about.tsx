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
        <div className="about">
            {aboutContent &&
                <>
                    {aboutContent.entryContent.map((block, index) => {
                        return (
                            <div key={index} className="content">
                                <h1>{block.sectionTitle}</h1>
                                <div dangerouslySetInnerHTML={{ __html: block.sectionContent }} />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}