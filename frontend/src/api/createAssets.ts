export const createAssets = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/assets/upload/${id}`, {
            method: "POST",
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