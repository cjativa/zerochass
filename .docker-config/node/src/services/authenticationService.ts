import { LoginPayload, SignUpPayload } from 'classes/authentication/authClasses';
import { AuthenticationResponse } from 'interfaces/authentication/authInterfaces';


const AUTH_ROUTE = '/api/authentication';

class AuthenticationService {

    async login(username: string, password: string): Promise<AuthenticationResponse> {

        const loginRoute = `/api/login`;
        const data = new LoginPayload(username, password);

        const response = (await fetch(loginRoute, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }));

        const aResponse = (await response.json()) as AuthenticationResponse;

        return aResponse;
    }

    async signUp(username: string, email: string, password: string): Promise<AuthenticationResponse> {

        const signUpRoute = `/api/signUp`

        const data = new SignUpPayload(username, email, password);

        const response = await fetch(signUpRoute, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const aResponse = (await response.json()) as AuthenticationResponse;

        return aResponse;
    }
}

export { AuthenticationService };