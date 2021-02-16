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

  const tutorials = await TutorialDB.getTutorialForEditing(ctx.req.userId);

  return {
    props: {
      tutorials,
    },
  };
};

export default Dashboard;
