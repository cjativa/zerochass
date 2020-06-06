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

export default WritePage;