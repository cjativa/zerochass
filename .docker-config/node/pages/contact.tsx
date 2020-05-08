import useMetaTags from 'react-metatags-hook';
import ReactMarkdown from 'react-markdown';

import { Layout } from '../components/Layout';
import { CraftQL } from '../util/services/craftGQL';
import { singlesQuery } from '../util/queries/singlesQuery';

const Contact = ({ title, slug, entryContent, description }) => {

    const pageTitle = `${title} | Zerochass`;
    const keywords = `about, company, information`;
    const summary = description;

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
        ]
    });

    return (
        <Layout pageTitle={`Contact | Zerochass`} description={description}>
            <div className="about single-page">
                {entryContent &&
                    <div className="body">
                        {entryContent.map((block, index) => {
                            return (
                                <div key={index} className="section-content">
                                    <h1 className="title">{block.sectionTitle}</h1>
                                    <ReactMarkdown source={block.sectionContent} />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </Layout>
    )
};

export async function getStaticProps() {
    const contact = (await CraftQL(singlesQuery('contact')))[0];
    let { slug, entryContent, description } = contact;
    description = entryContent && entryContent.map((e, i) => {
        if (i == 0) return `${e.sectionTitle} ${e.sectionContent}`.replace(/<[^>]*>/g, '')
    }).join(' ').trim();

    return {
        props: {
            title: 'Contact',
            slug,
            entryContent,
            description
        },
    }
};


export default Contact;