export const HostingReact = async (hostData:any) => {
    try{
        const response = await fetch(`http://localhost:3001/api/v1/react/`, {
            method: "POST",
            body: JSON.stringify(hostData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const respJSON = await response.json()
        return respJSON
    }catch(e){
        throw new Error("Something went wrong: " + e)
    }
}