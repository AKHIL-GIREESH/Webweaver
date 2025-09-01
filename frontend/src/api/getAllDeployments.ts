export const getAllDeployments = async (author:string) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/deployments/${author}`, {
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