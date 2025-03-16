import Cookies from "js-cookie";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
    try {
        const token = Cookies.get("token")
        console.log(token)
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch("http://localhost:3000/protected/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const { user } = await response.json();
        console.log("Me : ", user)

        return user

    } catch (e) {
        throw new Error("Unable to fetch user" + e)
    }
}