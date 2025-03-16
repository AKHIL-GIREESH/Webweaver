import { UserSignUpType } from "../types/user"

export const signUp = async (authData: UserSignUpType) => {
    try {
        const response = await fetch(`http://localhost:3000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authData)
        })

        const respJSON = await response.json()
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}