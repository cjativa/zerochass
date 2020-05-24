import authenticated from '../../util/middleware/authenticated';

const handler = (request, response) => {
    const { userId, accessToken } = request;
    response.json(`Your userId i s ${userId} and access token is ${accessToken}`)
};

export default authenticated(handler);