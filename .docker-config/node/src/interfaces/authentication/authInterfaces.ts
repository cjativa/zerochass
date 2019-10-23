export interface AuthenticationResponse {
    success: boolean,
    message: string,
}

export interface LoginResponse extends AuthenticationResponse {
    tokens: {
        accessToken: string
    },
    userPayload: {
        username: string,
        email: string, 
        name: string
    }
};