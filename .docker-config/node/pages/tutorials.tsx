import { Layout } from '../components/Layout';
import { TutorialCard } from '../components/tutorials/TutorialCard';
import { TutorialDatabaseService} from '../util/database/classes/tutorialDatabaseService';
import { GetStaticProps } from 'next';

const Tutorials = ({ title, description, tutorials, keywords, ...props }) => {
    return (
        <>
            <Layout pageTitle="Tutorials" description={description} slug="tutorials" keywords={keywords}>
                <div className="tutorial-list">
                    <div className="body">
                        {tutorials && tutorials.map((tutorial, index) => {
                            return <TutorialCard key={index} tutorial={tutorial} />
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

    const tutorials = await TutorialDatabaseService.retrieveTutorialsForSite();
    const config = await import(`../siteconfig.json`);

    return {
        props: {
            title: config.default.title,
            description: `Tutorials on the latest in JavaScript, TypeScript, NodeJS, and more.`,
            tutorials,
            keywords: config.default.keywords
        },
    }
};