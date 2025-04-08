export const deployWebsite = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/website/${id}`, {
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