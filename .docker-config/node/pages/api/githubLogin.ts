import { Octokit } from '@octokit/rest';
import { SignUpInformation } from '../../util/interfaces/userInterfaces';
import { UserService } from '../../util/services/userService';
import { AuthenticationService } from '../../util/services/authenticationService';

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

            // Retrieve the user information needed to sign them up
            const userInformation = await retrieveUserInformation(authentication);

            // Sign them up if need be
            const { userId, profileImageUrl } = await UserService.signUp(userInformation, "GITHUB");

            // Now that they're signed up, let's authenticate them by storing their access token
            const { access_token: accessToken } = authentication;
            await AuthenticationService.signIn(accessToken, userId, profileImageUrl, response);

            response.writeHead(302, { Location: '/' });
            response.end();
        }
    }
    catch (error) { console.log(`An error occurred authenticating with GitHub`, error); }
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