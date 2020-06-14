import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Layout } from '../../components/Layout';
import { Write } from '../../components/write/write';
import { Tutorial } from '../../util/interfaces/tutorial';
import TutorialService from '../../util/services/tutorialHelpers';

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
    const tutorialId = id && parseInt(id[0]);
    const { userId } = ctx.req;
    const pageTitle = tutorialId ? 'Edit Tutorial' : 'New Tutorial';
    const edit = tutorialId ? true : false;
    let tutorial = {};

    // If there's a slug, we're updating an existing tutorial
    if (tutorialId) {
        tutorial = await TutorialService.retrieveTutorial(tutorialId, userId);
    }

    // Otherwise, we're creating a new tutorial
    else {

    }

    return {
        props: {
            pageTitle,
            edit,
            tutorial
        }, // will be passed to the page component as props
    }
};

export default WritePage;