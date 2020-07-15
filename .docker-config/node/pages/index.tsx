import { Tutorial } from '../util/database/classes/tutorial';
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

  const tutorials = await Tutorial.retrieveTutorialsForSite(true);
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
