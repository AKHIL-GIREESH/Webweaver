export type UserSignUpType = {
    email: string,
    password: string,
    username?: string
}

export type User = {
    id: string,
    username: string,
    email: string,
    followers: string[],
    following: string[],
    website: string[]
}