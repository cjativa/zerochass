import React, { useState, useEffect } from 'react';

import { Layout } from '../../components/Layout';
import { Write } from '../../components/write/write';

const WritePage = ({ pageTitle, edit }) => {

    return (
        <Layout pageTitle={pageTitle}>
            <Write edit={edit} />
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../../util/middleware/protectedPage')).default;
    protectPageWithAuthentication(ctx);

    const { id } = ctx.params;
    const pageTitle = id ? 'Edit Tutorial' : 'New Tutorial';
    const edit = id ? true : false;

    // If there's a slug, we're updating an existing tutorial
    if (id) {

    }

    // Otherwise, we're creating a new tutorial
    else {

    }

    return {
        props: {
            pageTitle,
            edit
        }, // will be passed to the page component as props
    }
};

export default WritePage;