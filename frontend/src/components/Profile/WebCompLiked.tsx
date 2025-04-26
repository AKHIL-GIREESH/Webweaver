import { getAllMyWebsites } from "@/api/getAllMyWebsites"
import { getLikedProjects } from "@/api/getLikedProjects"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Loading from "../Layout/Loading"
import Errorr from "../Layout/Errorr"
import ProjectCard from "../Layout/ProjectCard"
import { useUser } from "@/hooks/useUser"

const WebCompLiked = ({ liked, websites, id }: { liked: string[] | undefined, websites: string[] | undefined, id: string }) => {
    const [selection, setSelection] = useState("PROJECTS")
    const user = useUser()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["webcompliked"],
        queryFn: async () => {
            const WebCompLikedData = { PROJECTS: [], LIKED: [] }
            if (websites) {
                const data = await getAllMyWebsites(id)
                WebCompLikedData.PROJECTS = data
            }
            if (liked) {
                const data = await getLikedProjects(id)
                WebCompLikedData.LIKED = data
            }

            console.log(WebCompLikedData)
            return WebCompLikedData
        },
    })

    if (isLoading && !data && !user) {
        return <Loading />
    }

    if (isError) {
        return <Errorr />
    }

    if (data && user) {

        const { liked: myLikes } = user

        const handleRender = () => {
            if (selection === "PROJECTS") {
                return data.PROJECTS.map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} liked={myLikes?.includes(_id) || false} self={true} />)
            }
            return data.LIKED.map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} liked={myLikes?.includes(_id) || false} self={true} />)
        }

        console.log(data)

        return (
            <div className="mt-[8vh] md:mt-[5vh]">
                <div className="flex justify-center gap-10 font-medium">
                    {["PROJECTS", "LIKED"].map(item => <p className={`py-[10px] w-[12vw] text-center rounded-full ${selection === item ? "bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]" : "bg-white"} text-black cursor-pointer`} onClick={() => setSelection(item)}>{item}</p>)}
                </div>
                <div className=" mt-[5vh] w-[92%] ml-[4%] flex flex-wrap ">
                    {handleRender()}
                </div>
            </div>
        )
    }
}

export default WebCompLiked