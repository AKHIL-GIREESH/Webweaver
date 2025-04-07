import Cookies from "js-cookie";

export const followUnfollow = async (id: string, check: boolean) => {
    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(`${check ? `http://localhost:3000/user/unfollow/${id}` : `http://localhost:3000/user/follow/${id}`}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}