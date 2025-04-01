import Cookies from "js-cookie";

export const likeProject = async (id: string, status: boolean) => {
    try {
        const url = status ? `http://localhost:3000/user/dislike/${id}` : `http://localhost:3000/user/like/${id}`
        const token = Cookies.get("token")
        console.log(token)
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return true
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}