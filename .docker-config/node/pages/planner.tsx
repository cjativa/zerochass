import Link from 'next/link';
import { Layout } from '../components/Layout';
import { Planner as PlannerComponent } from '../components/planner/planner';
import { Tutorial } from '../util/database/classes/tutorial';
import Planner from '../util/database/classes/planner';


const PlannerPage = ({ tutorials }) => {

    const title = 'Planner';

    return (
        <Layout pageTitle={title}>
            <PlannerComponent tutorials={tutorials}/>
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../util/middleware/protectedPage')).default;
    await protectPageWithAuthentication(ctx);

    const { userId } = ctx.req;
    const tutorials = await Planner.retrieveTutorials(userId);

    return {
        props: {
            tutorials
        }, // will be passed to the page component as props
    }
};

export default PlannerPage;