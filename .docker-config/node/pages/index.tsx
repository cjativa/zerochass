import useMetaTags from 'react-metatags-hook';
import { CraftQL } from '../util/services/craftGQL';
import { EightTutorialsQuery } from '../util/queries/tutorialsQuery';

import { Layout } from '../components/Layout';
import { SiteBanner } from '../components/landing/SiteBanner';
import { TutorialBannerList } from '../components/landing/TutorialBannerList';
import { GetStaticProps } from 'next';

const Index = ({ title, description, tutorials, keywords, ...props }) => {

  const pageTitle = `Home`;

  return (
    <Layout pageTitle={pageTitle} description={description} keywords={keywords} slug="" >
      <SiteBanner />
      <TutorialBannerList tutorials={tutorials} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {
  const params = (ctx.preview) ? ctx.previewData.params : null;

  const tutorials = (ctx.preview) ? await CraftQL(EightTutorialsQuery(), params) : await CraftQL(EightTutorialsQuery());
  const config = await import(`../siteconfig.json`);

  return {
    props: {
      title: config.default.title,
      description: config.default.description,
      tutorials,
      keywords: config.default.keywords
    },
  }
};

export default Index;
