import Head from 'next/head'
import { NavigationBar } from './NavigationBar';
import { InformationSection } from './InformationSection';
import { Footer } from './Footer';

export const Layout = ({ children, pageTitle, ...props }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>
            <section className="layout">
                <NavigationBar />
                <div className="app__body">{children}</div>
            </section>
            <InformationSection />
            <Footer />
        </>
    )
}