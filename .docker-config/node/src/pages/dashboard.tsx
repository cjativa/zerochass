import { Layout } from "../components/Layout";
import { WrittenTutorialsDashboard } from "../components/dashboard/dashboard";
import { TutorialDB } from "../../server/dataAccess/tutorials/entity";

const Dashboard = ({ tutorials }) => {
  const title = "Dashboard";

  return (
    <Layout pageTitle={title}>
      <WrittenTutorialsDashboard
        tutorials={tutorials}
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const protectPageWithAuthentication = (
    await import("../../server/api/middleware/protectedPage")
  ).default;
  await protectPageWithAuthentication(ctx);

  const fetchedTutorials = await TutorialDB.getTutorialForEditing(ctx.req.userId);

  // Set up promises for fetching the tags
  const tagPromises = fetchedTutorials.map((tutorial) => TutorialDB.getTags(tutorial.id));
  const tagResults = await Promise.all(tagPromises);

  // Store them into each tutorial
  const tutorials = fetchedTutorials.map((tutorial, index) => {
    return {
      ...tutorial,
      tags: tagResults[index],
    };
  });

  return {
    props: {
      tutorials,
    },
  };
};

export default Dashboard;
