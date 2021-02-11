import { GetServerSideProps } from "next";

import { Layout } from "../../components/Layout";
import { Tutorial } from "../../components/tutorial/tutorial";
import { TutorialDB } from "../../../server/dataAccess/tutorials/entity";
import { TutorialSectionDB } from "../../../server/dataAccess/tutorialSection/entity";
import { PlannerDB } from '../../../server/dataAccess/planner/entity';

const TutorialPage = ({ tutorial }) => {
  const { tags, description1, description2, featuredImage, slug } = tutorial;

  const keywords = tags.map((tag) => tag.title).join();
  const descriptions = `${description1} ${description2}`;

  return (
    <Layout
      pageTitle={tutorial.title}
      description={descriptions}
      keywords={keywords}
      slug={`tutorial/${slug}`}
      image={featuredImage}
      large={true}
    >
      <Tutorial tutorial={tutorial} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ ...ctx }) => {
  const slug = ctx.params.slug as string;
  const config = await import(`../../../siteconfig.json`);

  const tutorialMain = await TutorialDB.findTutorial("slug", slug);
  const sections = await TutorialSectionDB.listTutorialSections(tutorialMain.id);
  const tags = await TutorialDB.getTags(tutorialMain.id);

  const tutorial = {
    ...tutorialMain,
    tags,
    sections
  };

  const totalRegisteredCount = await PlannerDB.getRegisteredCount(tutorialMain.id);

  return {
    props: {
      siteTitle: config.title,
      tutorial,
    },
  };
};

export default TutorialPage;
