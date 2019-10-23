export interface User {

    profile: Profile,
    account: Account,
    connect: Connect,
}

export interface Profile {
    heading: string, 
    name: string,
    aboutMe: string,
    website: string,
}

export interface Account {
    email: string,
    username: string,

    // Only available for updating, not reading
    password?: string
}

export interface Connect {

    github: {
        username: string,
    },

    linkedIn: {
        fullName: string,
        username: string,
    },

    twitter: {
        username: string,
    }
}