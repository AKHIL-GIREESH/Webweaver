import Cookies from "js-cookie";

export const getFollow = async (id: string) => {
    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(`http://localhost:3000/getfollow/${id}`, {
            method: "GET",
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