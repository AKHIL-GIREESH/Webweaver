export const getAllWebsites = async (id: string, check: boolean) => {
    try {
        let response
        if (check) {
            response = await fetch(`http://localhost:3000/project/notuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        } else {
            response = await fetch(`http://localhost:3000/project/notuser/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}