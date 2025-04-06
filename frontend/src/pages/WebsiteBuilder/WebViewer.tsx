import { getUserById } from "@/api/getUserById"
import { getWebsite } from "@/api/getWebsite"
import TopDetailsBar from "@/components/forWeb/TopDetailsBar"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const WebViewer = () => {
    const { id } = useParams()
    const [like, setLike] = useState<boolean>(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ["otherweb", id],
        queryFn: async () => {
            if (!id) throw new Error("No ID found")
            const web = await getWebsite(id)
            const { author } = web.Website
            const user = await getUserById(author)
            return {
                web,
                author: user.user
            }
        },
        enabled: !!id, // only fetch when id exists
    })

    useEffect(() => {
        if (data?.author?.liked && data.web?.Website?._id) {
            // console.log(data.author.liked.includes(data.web.Website._id))
            setLike(data.author.liked.includes(data.web.Website._id))
        }
    }, [data])

    if (isLoading) return <Loading />
    if (error || !data) return <Errorr />
    if (data) {
        return (
            <div>
                <TopDetailsBar />
                <p>{data.author.username}</p>
                <p>{data.web.Website.title}</p>
                <p>{like ? "True" : "False"}</p>
                WebViewer
            </div>
        )

    }
}

export default WebViewer
