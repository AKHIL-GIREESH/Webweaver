import { getUserById } from "@/api/getUserById"
import { getWebsite } from "@/api/getWebsite"
import Component from "@/components/forWeb/Component"
import CompView from "@/components/forWeb/CompView"
import Elem from "@/components/forWeb/Elem"
import ElemView from "@/components/forWeb/ElemView"
import TopDetailsBar from "@/components/forWeb/TopDetailsBar"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import { EditorContainerType, EditorElementType } from "@/types/editor"
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
                web: web.Website,
                author: user.user
            }
        },
        enabled: !!id, // only fetch when id exists
    })

    useEffect(() => {
        if (data?.author?.liked && data.web?._id) {
            // console.log(data.author.liked.includes(data.web.Website._id))
            setLike(data.author.liked.includes(data.web._id))
        }
    }, [data])

    const webBuilder = (prop: EditorContainerType | EditorElementType) => {
        if (prop.kind == "Elem") {
            return (<ElemView contents={prop.contents} styles={prop.styles} kind={prop.kind} parent={prop.parent} key={prop.id} id={prop.id} />)
        } else {
            return (<CompView contents={prop.contents} styles={prop.styles} kind={prop.kind} recFunc={webBuilder} parent={prop.parent} key={prop.id} id={prop.id} />)
        }
    }

    if (isLoading) return <Loading />
    if (error || !data) return <Errorr />
    if (data) {
        const { title, code } = data.web
        const { pfp, username } = data.author
        return (
            <div className="h-[100vh] w-[100vw]">
                <TopDetailsBar title={title} author={username} pfp={pfp} like={like} setLike={setLike} />
                {webBuilder(code)}
            </div>
        )

    }
}

export default WebViewer
