import { Layout } from '../../components/Layout';
import { Write } from '../../components/write/write';
import { TutorialInterface } from '../../util/interfaces/tutorial';
import { Tutorial } from '../../util/database/classes/tutorial';

const WritePage = ({ pageTitle, edit, tutorial }) => {

    return (
        <Layout pageTitle={pageTitle}>
            <Write edit={edit} tutorial={tutorial} />
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../../util/middleware/protectedPage')).default;
    await protectPageWithAuthentication(ctx);

    const { id } = ctx.params;
    const { userId } = ctx.req;
    const tutorialId = id && parseInt(id[0]);
    const ts = new Tutorial(null, userId)

    const edit = tutorialId ? true : false;
    const pageTitle = tutorialId ? 'Edit Tutorial' : 'New Tutorial';
    const tutorial = (tutorialId) ? await ts.retrieveTutorial(tutorialId) : {};

    return {
        props: {
            pageTitle,
            edit,
            tutorial
        }, // will be passed to the page component as props
    }
};

export default WritePage;