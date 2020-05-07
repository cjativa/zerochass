import useMetaTags from 'react-metatags-hook';
import { CraftQL } from '../util/services/craftGQL';
import { AllTutorialsQuery } from '../util/queries/tutorialsQuery';

import { Layout } from '../components/Layout';
import { SiteBanner } from '../components/SiteBanner';
import { TutorialBannerList } from '../components/TutorialBannerList';
import { GetStaticProps } from 'next';

const Index = ({ title, description, tutorials, ...props }) => {

  const pageTitle = `Home | Zerochass`;
  const summary = description;
  const keywords = `zerochass, company, coding, programming, tutorials, javascript, typescript, software engineering, web development, free`;

  useMetaTags({
    title: pageTitle,
    description: summary,
    charset: 'utf8',
    lang: 'en',
    metas: [
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'url', content: `${process.env.CANONICAL_ROOT}/` },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@zerochass' },
      { name: 'twitter:title', content: pageTitle, },
      { name: 'twitter:description', content: summary },
    ]
  });


  return (
    <Layout pageTitle={`${title} | Tutorials`} description={description}>
      <SiteBanner />
      <TutorialBannerList tutorials={tutorials} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {
  const params = (ctx.preview) ? ctx.previewData.params : null;

  const tutorials = (ctx.preview) ? await CraftQL(AllTutorialsQuery(), params) : await CraftQL(AllTutorialsQuery());
  const config = await import(`../siteconfig.json`);

  return {
    props: {
      title: config.default.title,
      description: `Zerochass is an online learning platform, where you can learn more about software engineering and web development. Here you'll find quick and bite-size tutorials about React, TypeScript, JavaScript, NodeJS, and much more regarding software engineering and web development.`,
      tutorials
    },
  }
};

export default Index;
