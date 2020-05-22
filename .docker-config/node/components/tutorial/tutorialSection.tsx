import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import prismjs from 'prismjs';

export const TutorialSection = (props) => {

    useEffect(() => {
        prismjs.highlightAll();
    }, []);

    const { content, id, progressCheck } = props;
    const { sectionTitle, sectionContent } = content;

    return (
        <section className="section line-numbers">
            {/** Section title and content */}
            <h2 id={id}>{sectionTitle}</h2>
            <ReactMarkdown className="section__text" source={sectionContent} linkTarget="_blank" />

            {/** Section progress check icon */}
            <div className="section__progress">
                <hr className="progress-rule" />
                {progressCheck}
            </div>
        </section >
    )
};