import ReactMarkdown from 'react-markdown';

import { Layout } from '../components/Layout';
import { CraftQL } from '../util/services/craftGQL';
import { singlesQuery } from '../util/queries/singlesQuery';

const Contact = ({ title, slug, entryContent, description, keywords }) => {

    let fullKeywords = ['company', 'contact', 'information', ...keywords].join();

    return (
        <Layout pageTitle={title} description={description} slug={slug} keywords={fullKeywords}>
            <div className="about single-page">
                {entryContent &&
                    <div className="body">
                        {entryContent.map((block, index) => {
                            return (
                                <div key={index} className="section-content">
                                    <h1 className="title">{block.sectionTitle}</h1>
                                    <ReactMarkdown source={block.sectionContent} linkTarget="_blank" />
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

    const config = await import(`../siteconfig.json`);

    return {
        props: {
            title: 'Contact',
            slug,
            entryContent,
            description,
            keywords: config.default.keywords
        },
    }
};


export default Contact;