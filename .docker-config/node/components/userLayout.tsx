import { Layout } from './Layout';

export const UserLayout = ({ children, title, subtitle }) => {
    return (
        <Layout pageTitle={title}>
            <div className="user-layout">
                <div className="user-layout__header" >
                    <p className="user-layout__title">{title}</p>
                    <p className="user-layout__subtitle">{subtitle}</p>
                </div>
                <div className="user-layout__container">
                    {children}
                </div>
            </div>
        </Layout>
    )
};