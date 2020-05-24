import { Octokit } from '@octokit/rest';
import { SignUpInformation } from '../../util/interfaces/userInterfaces';
import { UserService } from '../../util/services/userService';

const octokit = new Octokit();
const githubAuthUrl = 'https://github.com/login/oauth/access_token';

export default async (request, response) => {

    const { code } = request.query;

    // Set up our request
    const headers = { accept: 'application/json' };
    const data = {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
    };

    try {
        const authentication = (await octokit.request(`POST ${githubAuthUrl}`, { headers, data })).data;

        if (authentication) {
            const userInformation = await retrieveUserInformation(authentication);
            await UserService.signUp(userInformation, "GITHUB");
        }
    }
    catch (error) { console.log(`An error occurred authenticating with GitHub`, error); }

    response.end();
};

const retrieveUserInformation = async (authentication): Promise<SignUpInformation> => {

    let userInformation = {} as SignUpInformation;
    const { access_token: accessToken, scope } = authentication;

    const hasPrivateEmailScope = scope.includes('user:email');
    const hasUserProfileScope = scope.includes('read:user');
    const headers = { Authorization: `token ${accessToken}` }

    // We should have this scope - just checking to be sure
    if (hasUserProfileScope) {
        const userProfile = (await octokit.users.getAuthenticated({ headers })).data;
        const { login: username, avatar_url: profileImageUrl, id: uid, name } = userProfile;

        userInformation = { ...userInformation, username, profileImageUrl, name, uid };
    }

    // We should have this scope - just checking to be sure
    if (hasPrivateEmailScope) {
        const privateEmails = (await octokit.users.listEmails({ headers })).data;
        const { email } = privateEmails.find((p) => p.primary == true);

        userInformation = { ...userInformation, email };
    }

    return userInformation;
};