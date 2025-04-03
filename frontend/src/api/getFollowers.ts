import Cookies from "js-cookie";

const getFollowers = async (id: string) => {
    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch(`http://localhost:3000/user/follow/${id}`, {
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

export default getFollowers