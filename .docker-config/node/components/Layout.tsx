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
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163465719-1"></script>
                <script>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag("js", new Date());
                    gtag("config", "UA-163465719-1");
                    `}
                </script>
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