import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Layout } from '../components/Layout';
import TutorialService from '../util/services/tutorialService';

const Dashboard = ({ tutorials }) => {

    const title = 'Dashboard';
    console.log(tutorials);

    return (
        <Layout pageTitle={title}>
            <div className="dashboard padded-page">
                <div className="padded-page__content">
                    <h1>Dashboard</h1>
                    <p>Here's where you'll find tutorials you've written</p>
                    <div className="dashboard__tut-list">
                        {tutorials.map((tutorial, index) => {
                            return (
                                <div className="dashboard__tut-item" key={`${tutorial.title}__${index}`}>
                                    <Link href={`/write/${tutorial.id}`}><a>{tutorial.title}</a></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../util/middleware/protectedPage')).default;
    await protectPageWithAuthentication(ctx);

    const { userId } = ctx.req;
    const tutorials = await TutorialService.retrieveTutorials(userId);

    return {
        props: {
            tutorials
        }, // will be passed to the page component as props
    }
};

export default Dashboard;