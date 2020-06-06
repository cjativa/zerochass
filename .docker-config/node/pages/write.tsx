import React, { useState, useEffect } from 'react';

import { Layout } from '../components/Layout';
import { Write } from '../components/write/write';

const WritePage = () => {

    return (
        <Layout pageTitle={"New Tutorial"}>
            <Write />
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../util/middleware/protectedPage')).default;
    protectPageWithAuthentication(ctx);

    return {
        props: {}, // will be passed to the page component as props
    }
};

export default WritePage;