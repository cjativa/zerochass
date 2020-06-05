import { useState, useEffect } from 'react';

import { Layout } from '../components/Layout';
import { Main } from '../components/write/main';
import { Sidebar } from '../components/write/sidebar';

const Write = () => {



    return (
        <Layout pageTitle={"New Tutorial"}>

            <div className="write">
                <div className="body">

                    <Main />
                    <Sidebar />

                </div>
            </div>
        </Layout>
    )
};

export default Write;