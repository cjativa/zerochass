import { GetServerSideProps } from 'next'

import { Layout } from '../../components/Layout'
import { Tutorial as TutorialComponent } from '../../components/tutorial/tutorial'
import { Tutorial } from '../../util/database/classes/tutorialDatabaseService';

const TutorialPage = ({ siteTitle, tutorial }) => {

    const { tags, description1, description2, featuredImage, slug } = tutorial;

    const keywords = tags.map((tag) => tag.title).join();
    const descriptions = `${description1} ${description2}`;

    return (
        <Layout pageTitle={tutorial.title}
            description={descriptions}
            keywords={keywords}
            slug={`tutorial/${slug}`}
            image={featuredImage}
            large={true}
        >
            <TutorialComponent tutorial={tutorial} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ ...ctx }) => {
    const slug = ctx.params.slug as string;

    const ts = new Tutorial(null, null);
    const tutorial = await ts.retrieveTutorial(slug);
    const config = await import(`../../siteconfig.json`);

    return {
        props: {
            siteTitle: config.title,
            tutorial,
        },
    }
}

export default TutorialPage;

/* export const getStaticPaths: GetStaticPaths = async () => {
    const tutorials = await CraftQL(AllTutorialsQuery());
    const paths = tutorials.map((tutorial) => ({
        params: { slug: tutorial.slug }
    }));

    return {
        paths,
        fallback: false,
    }
} */