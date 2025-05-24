export const createAssets = async (id: string, file:File): Promise<string> => {
    try {
        const formData = new FormData()
        formData.append("upload", file)
        const response = await fetch(`http://localhost:3000/assets/upload/${id}`, {
            method: "POST",
            body: formData,
        })

        const respJSON = await response.json()
        return respJSON.url
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}