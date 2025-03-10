import { UserSignUpType } from "../types/user"

export const signUp = async (loginData: UserSignUpType) => {
    try {
        const response = await fetch(`http://localhost:3000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}