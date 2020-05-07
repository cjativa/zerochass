import Link from 'next/link';

import { Layout } from '../components/Layout'
import { CraftQL } from '../util/services/craftGQL';
import { AllTutorialsQuery } from '../util/queries/tutorialsQuery';
import { GetStaticProps } from 'next';

const Tutorials = ({ title, description, tutorials, ...props }) => {
    return (
        <>
            <Layout pageTitle={`${title} | Tutorials`} description={description}>
                <div className="tutorial-list">
                    <div className="body">
                        {tutorials && tutorials.map((tutorial, index) => {
                            return <TutorialListCard key={index} tutorial={tutorial} />
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
};

export default Tutorials;

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {

    const params = (ctx.preview) ? ctx.previewData.params : null;

    const tutorials = (ctx.preview) ? await CraftQL(AllTutorialsQuery(), params) : await CraftQL(AllTutorialsQuery());
    const config = await import(`../siteconfig.json`);

    return {
        props: {
            title: config.default.title,
            description: `Tutorials on the latest in JavaScript, TypeScript, NodeJS, and more.`,
            tutorials
        },
    }
};

const TutorialListCard = ({ tutorial }) => {

    const { featuredImage, title, color, description, slug } = tutorial;
    const shorterDescription = description[0].secondLine;

    const imageUrl = featuredImage[0].url;

    return (
        <Link href={`/tutorial/${slug}`}>
            <a className="tl-card" >
                <div className={`tl-card__top ${color}`}  >
                    <img className="tl-card__image" src={imageUrl} style={{ height: '100%', width: 'auto', position: 'absolute' }} />
                    <div className="tl-card__layer" />

                </div>
                <div className={`tl-card__bottom`}>
                    <h1 className="tl-card__title">{title}</h1>
                    {shorterDescription}
                </div>
            </a>
        </Link>
    )
};