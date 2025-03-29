import { websiteAPIType } from "@/types/editor"

export const createWebsite = async (webData: websiteAPIType) => {
    try {
        const response = await fetch(`http://localhost:3000/project/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(webData)
        })

        const respJSON = await response.json()
        return respJSON
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}