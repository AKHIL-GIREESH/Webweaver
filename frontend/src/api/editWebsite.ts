import { websiteAPIType } from "@/types/editor"

export const updateWebsite = async (webData: websiteAPIType, id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/project/${id}`, {
            method: "PATCH",
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