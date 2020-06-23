import Link from 'next/link';
import { Layout } from '../components/Layout';

import { TutorialDatabaseService } from '../util/database/classes/tutorialDatabaseService';

const Planner = ({ tutorials }) => {

    const title = 'Planner';

    return (
        <Layout pageTitle={title}>
            <div className="planner padded-page">
                <div className="padded-page__content">
                    <h1>Planner</h1>
                    <p>Here's where you'll find tutorials you've started</p>

                </div>
            </div>
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../util/middleware/protectedPage')).default;
    await protectPageWithAuthentication(ctx);

    const { userId } = ctx.req;

    const tds = new TutorialDatabaseService(null, userId)
    const tutorials = await tds.retrieveTutorials();

    return {
        props: {
            tutorials
        }, // will be passed to the page component as props
    }
};

export default Planner;