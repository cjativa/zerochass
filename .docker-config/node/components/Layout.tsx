import Head from 'next/head';
import { useEffect, useState } from 'react';

import { NavigationBar } from './NavigationBar';
import { InformationSection } from './InformationSection';
import { Footer } from './Footer';
import { CraftQL } from '../util/services/craftGQL';
import { AllTutorialsQuery } from '../util/queries/tutorialsQuery';

const defaultImage = 'https://s3.us-east-1.amazonaws.com/zerochass-assets/images/zerochass-rect.PNG';

interface LayoutProps {
    children?: any,
    pageTitle: string,
    description: string,
    keywords: string,
    slug: string,
    image?: string,
    large?: boolean
};

export const Layout = (props: LayoutProps) => {

    const { children, pageTitle, description, keywords, slug, image, large } = props;
    const fullPageTitle = `${pageTitle} | Zerochass`;
    const [tutorial, setTutorial] = useState(null);

    useEffect(() => {

        const fetchTutorialOfDay = async () => {
            const tutorials = await CraftQL(AllTutorialsQuery());

            const randomGenerator = () => {
                let seed = new Date().getDate() + 5;
                const x = Math.sin(seed++);
                return (x - Math.floor(x)) * tutorials.length;
            };

            const randomNumber = Math.floor(randomGenerator());
            const randomTutorial = tutorials[randomNumber];
            setTutorial(randomTutorial);
        };

        fetchTutorialOfDay();
    }, []);


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="url" content={`${process.env.NEXT_PUBLIC_CANONICAL_ROOT}/${slug}`} />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="robots" content="index, follow" />

                {/** Twitter metas */}
                <meta name="twitter:card" content={(large) ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:site" content="@zerochass" />
                <meta name="twitter:title" content={fullPageTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={(image) ? image : defaultImage} />

                <title>{fullPageTitle}</title>

                {/** Scripts */}
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
                <NavigationBar tutorial={tutorial} />
                <div className="app__body">{children}</div>
            </section>
            <InformationSection />
            <Footer />
        </>
    )
};