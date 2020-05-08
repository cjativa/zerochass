import { useEffect, useState, createRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import useMetaTags from 'react-metatags-hook';

import { Layout } from '../../components/Layout'

import { CraftQL } from '../../util/services/craftGQL';
import { slugify } from '../../util/services/slugify';
import { TutorialSingleQuery } from '../../util/queries/tutorialQuery';
import { AllTutorialsQuery } from '../../util/queries/tutorialsQuery';

import { TutorialHeader } from '../../components/tutorial/tutorialHeader';
import { TutorialSection } from '../../components/tutorial/tutorialSection';
import { SectionsBar } from '../../components/tutorial/sectionsBar';
import { ShareBar } from '../../components/tutorial/shareBar';
import { ProgressCheck } from '../../components/tutorial/progressCheck';

const TutorialPost = ({ siteTitle, tutorial }) => {
    if (!tutorial) return <></>

    let previousEntry, nextEntry;

    const { title, tags, featuredImage, color, tutorialContent, description, slug } = tutorial;

    const [sectionRefs, setSectionRefs] = useState([]);
    const [sectionInformation, setSectionInformation] = useState([]);

    /** Effects to occur on mount */
    useEffect(() => {
        parseContentSections();

        if (tutorial.hasOwnProperty('parent')) {
            setupTutorialSeries();
        }
    }, []);

    /** Effects to occur when section information changes */
    useEffect(() => {

        // Add refs
        const refs = sectionInformation.map((s, i) => sectionRefs[i] || createRef());

        // Set the refs
        setSectionRefs(refs);

    }, [sectionInformation]);

    const pageTitle = `${title} | Zerochass`;
    const keywords = tags.map((tag) => tag.title).join();
    const summary = description.map((d) => `${d.firstLine} ${d.secondLine}`).join();

    useMetaTags({
        title: pageTitle,
        description: summary,
        charset: 'utf8',
        lang: 'en',
        metas: [
            { name: 'keywords', content: keywords },
            { name: 'robots', content: 'index, follow' },
            { name: 'url', content: `http://zerochass.io/tutorial/${slug}` },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@zerochass' },
            { name: 'twitter:title', content: pageTitle, },
            { name: 'twitter:description', content: summary },
            { name: 'twitter:image', content: featuredImage[0].url }
        ]
    });


    const parseContentSections = () => {

        const { tutorialContent } = tutorial;
        const sectionInformation = [];

        tutorialContent.forEach((section) => {
            const { sectionTitle: title } = section;
            const id = slugify(title);
            const meta = { title, id, sectionComplete: false };

            sectionInformation.push(meta);
        });

        setSectionInformation(sectionInformation);
    }

    const setupTutorialSeries = () => {
        const entries = tutorial.parent.children;

        // Locate this entry in the entries list
        const thisEntryIndex = entries.findIndex((entry) => {
            return tutorial.id === entry.id;
        });

        // Check if a previous entry would exist
        if (entries[thisEntryIndex - 1]) {

            // Get the title and slug
            const { title } = entries[thisEntryIndex - 1];
            const link = slugify(title);

            previousEntry = { title, link };
        }

        // Check if a next entry would exist
        if (entries[thisEntryIndex + 1]) {

            // Get the title and slug
            const { title } = entries[thisEntryIndex + 1];
            const link = slugify(title);

            nextEntry = { title, link };
        }
    }

    const onProgressClick = (index: number) => {
        const nextIndex = index + 1;

        if (nextIndex !== sectionInformation.length) {
            const yOffset = -80;
            const element = sectionRefs[nextIndex].current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }

        const sections = [...sectionInformation];
        sections[index].sectionComplete = !sections[index].sectionComplete;

        setSectionInformation(sections);
    }

    return (
        <Layout pageTitle={`${tutorial.title} | Zerochass`}>
            <article className="tutorial-page">

                {/* Header section containing the tutorial image and title */}
                <div className="tutorial-page__header">
                    <TutorialHeader title={title} tags={tags} featuredImage={featuredImage} color={color} />
                </div>

                {/** Body section containing the tutorial content and share bars, sections, and related tutorials */}
                <div className="tutorial-page__body">

                    {/** Display the side bar */}
                    <div className="side-bar-column">
                        {/* Display the content bar */}
                        <SectionsBar sectionInformation={sectionInformation} />

                        {/** Display the share bar */}
                        <ShareBar tutorialTitle={title} slug={slug} />
                    </div>

                    {/* Display the content sections */}
                    <div className="sections">
                        {sectionInformation.length > 0 && tutorialContent.map((content, index) => {

                            const sectionComplete = sectionInformation[index].sectionComplete;

                            // Slugify the title
                            const id = slugify(content.sectionTitle);

                            // Build the Progress Check component
                            const progressCheck = <ProgressCheck index={index} onProgressClick={onProgressClick} sectionComplete={sectionComplete} />

                            // Return the composed Section component
                            return (
                                <div className="section-item" key={index} ref={sectionRefs[index]}>
                                    <TutorialSection content={content} key={index} index={index} id={id} progressCheck={progressCheck} />
                                </div>
                            );
                        })}
                    </div>

                </div>

            </article>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {

    const slug = ctx.params.slug as string;
    const tutorialQuery = TutorialSingleQuery(slug);

    const params = (ctx.preview) ? ctx.previewData.params : null;

    const tutorialContent = (ctx.preview) ?
        (await CraftQL(tutorialQuery, params))[0]
        : (await CraftQL(tutorialQuery))[0];
    const config = await import(`../../siteconfig.json`);

    return {
        props: {
            siteTitle: config.title,
            tutorial: tutorialContent,
        },
    }
}

export default TutorialPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const tutorials = await CraftQL(AllTutorialsQuery());
    const paths = tutorials.map((tutorial) => ({
        params: { slug: tutorial.slug }
    }));

    return {
        paths,
        fallback: false,
    }
}