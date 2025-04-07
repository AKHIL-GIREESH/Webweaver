import { getLikedProjects } from "@/api/getLikedProjects"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import ProjectCard from "@/components/Layout/ProjectCard"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Favourite = () => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { liked, id, websites } = UserContext.user

    const { data, isLoading, error } = useQuery({
        queryKey: ["myfav"],
        queryFn: async () => {
            if (!id) throw new Error("No ID found")
            const projects = await getLikedProjects(id)
            console.log(projects)
            return projects
        },
        enabled: !!id,
    })

    if (isLoading) return <Loading />
    if (error || !data) return <Errorr />


    return (
        <div className="flex flex-col items-center">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-5 mt-5">Handpicked By You</p>
            {(!liked || liked?.length === 0) && <p>You haven't liked any<br /></p>}
            {(liked && liked?.length > 0) &&
                <div className="flex flex-wrap justify-start ">{data.map(({ _id, title }: { _id: string, title: string }) => <ProjectCard _id={_id as string} title={title} liked={true} self={websites?.includes(_id) ? true : false} />)}</div>
            }
            <Link to="/explore"><Button variant="auth">Explore More</Button></Link>
        </div>
    )
}



export default Favourite