export default async function protectPageWithAuthentication({ req, res }) {
    const { isAuthenticated } = (await import('../../util/middleware/protectWithAuthentcation'));
    const { authenticated } = isAuthenticated(req, res);

    if (!authenticated) {
        res.writeHead(302, { Location: '/' });
        res.end();
    }
};