import { getAUser } from "@/api/getAUser"
import { getWebsite } from "@/api/getWebsite"
import TopDetailsBar from "@/components/forWeb/TopDetailsBar"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"

const WebViewer = () => {
    const [allData, setAllData] = useState<any>(null)

    const { id } = useParams()

    const { data, isLoading, error } = useQuery({
        queryKey: ["otherweb"],
        queryFn: async () => {
            if (id) {
                const web = await getWebsite(id)
                console.log(web)
                const { author } = web.Website
                console.log(author)
                const user = await getAUser(author)
                setAllData({
                    web: web,
                    author: user
                })
            }
        }
    })

    if (isLoading && !allData) {
        return <Loading />
    }

    if (error) {
        console.log(error)
        return <Errorr />
    }

    if (data && allData) {
        return (
            <div>
                <TopDetailsBar />
                {allData.author.username}
                {allData.web.title}
                WebViewer
            </div>
        )
    }
}

export default WebViewer