export type UserSignUpType = {
    email: string,
    password: string,
    username?: string
}

export type UserFollow = {
    id: string,
    username: string,
    pfp: string,
}

export type UserWebsite = {
    id: string,
    title: string,
    thumbnail: string
}

export type User = {
    id: string,
    username: string,
    pfp: string,
    email: string,
    followers: string[],
    following: string[],
    website: string[]
}

export type UserContextType = {
    user: User | null,
    update: (user: User | null) => void
}