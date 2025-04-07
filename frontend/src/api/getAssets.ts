export const getAssets = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/assets/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const respJSON = await response.json()
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}