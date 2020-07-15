import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Layout } from '../components/Layout';
import TutorialService from '../util/services/tutorialHelpers';
import { Tutorial } from '../util/database/classes/tutorial';

const Dashboard = ({ tutorials }) => {

    const title = 'Dashboard';

    return (
        <Layout pageTitle={title}>
            <div className="dashboard padded-page">
                <div className="padded-page__content">
                    <h1>Dashboard</h1>
                    <p>Here's where you'll find tutorials you've written</p>

                    {/** Tutorial list table */}
                    <table className="dashboard__table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Featured Image</th>
                                <th>Color</th>
                                <th>Tags</th>
                                <th>Slug</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tutorials.map((tutorial, index) => {
                                return (
                                    <tr className="dashboard__row" key={`${tutorial.title}__${index}`}>

                                        {/** Title and enabled */}
                                        <td >
                                            <span className={`circle ${(tutorial.enabled) ? 'enabled' : 'not-enabled'}`} />
                                            <Link href={`/write/${tutorial.id}`}>
                                                <a className="dashboard__row-link">
                                                    {tutorial.title}
                                                </a>
                                            </Link>
                                        </td>

                                        {/** Featured Image */}
                                        <td>
                                            {
                                                tutorial.featuredImage ?
                                                    <img className="dashboard__row-fi" src={tutorial.featuredImage} /> :
                                                    <i className="dashboard__row-fi fas fa-image " />
                                            }
                                        </td>

                                        {/** Tutorial Color */}
                                        <td className="dashboard__row-color">
                                            <p>{tutorial.color}</p>
                                        </td>

                                        {/** Tags */}
                                        <td>
                                            {/* {tutorial.tags.map((tag) => {
                                                <span>{tag}</span>
                                            })} */}
                                        </td>

                                        {/** Slug Url */}
                                        <td>
                                            <p>{tutorial.slug}</p>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </Layout>
    )
};

export const getServerSideProps = async (ctx) => {

    const protectPageWithAuthentication = (await import('../util/middleware/protectedPage')).default;
    await protectPageWithAuthentication(ctx);

    const { userId } = ctx.req;

    const tds = new Tutorial(null, userId)
    const tutorials = await tds.retrieveTutorials();

    return {
        props: {
            tutorials
        }, // will be passed to the page component as props
    }
};

export default Dashboard;