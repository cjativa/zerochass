import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from './Layout';
import logo from '../assets/logo.svg';

export const UserLayout = ({ children, title, subtitle }) => {

    const { pathname } = useRouter();

    return (
        <Layout pageTitle={title}>
            <div className="user-layout">
                <div className="user-layout__container">

                    {/** Page Side Menu */}
                    <div className="user-layout__menu">
                        <img src={logo} />
                        <ul className="user-layout__menu-links">
                            <li >
                                <Link href="/profile">
                                    <a className={`user-layout__menu-link ${(pathname.includes('profile') ? 'active' : '')}`}>Profile</a>
                                </Link>
                            </li>
                            <li >
                                <Link href="/account">
                                    <a className={`user-layout__menu-link ${(pathname.includes('account') ? 'active' : '')}`}>Account</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/** Page Content */}
                    <div className="user-layout__content">
                        <div className="user-layout__header" >
                            <p className="user-layout__title">{title}</p>
                            <p className="user-layout__subtitle">{subtitle}</p>
                        </div>
                        <div className="user-layout__body">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
};