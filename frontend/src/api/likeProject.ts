export const likeProject = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/user/like/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return true
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}