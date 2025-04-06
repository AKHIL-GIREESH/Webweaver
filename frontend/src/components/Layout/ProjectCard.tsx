// import { createWebsite } from "@/api/createWebsite"
// import { AuthContext } from "@/providers/authProvider"
// import { useMutation } from "@tanstack/react-query"
import { likeProject } from "@/api/likeProject"
import { useSetAuth } from "@/hooks/useSetUser"
import { AuthContext } from "@/providers/authProvider"
import { useMutation } from "@tanstack/react-query"
import { Heart, Loader2, RotateCcw } from "lucide-react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useContext } from "react"
// import { useNavigate } from "react-router-dom"

const ProjectCard = ({ _id, title, liked }: { _id: string, title: string, thumbnail?: string, liked: boolean }) => {

    // const { mutate: createProjectMutate, isPending, isError } = useMutation({
    //     mutationFn: async () => {
    //         let newProject
    //         if (UserContext.user) {
    //             newProject = await createWebsite({ title: "Untitled Project", author: UserContext.user.id })
    //         }
    //         // const { token, user } = newUser
    //         console.log("newProject works : ", newProject)
    //         navi(`/websitebuilder/${newProject.website._id}`)

    //     }
    // })

    const setAuth = useSetAuth();


    const { mutate: likeProjectMutate, isPending, isError } = useMutation({
        mutationFn: async () => {
            await likeProject(_id, liked)
            setAuth((prev: any) => prev && { ...prev, liked: prev.liked ? [...prev.liked, _id] : [_id] });
            // const { token, user } = newUser
            // console.log("newProject works : ", newProject)
            // navi(`/websitebuilder/${newProject.website._id}`)
        }
    })

    return (
        <Link to={`/websitebuilder/${_id}`} className="ml-[6vw] mb-[5vh]">
            <div className="flex items-end outline-light outline-2 h-[35vh] w-[30vw] bg-[#121212] rounded-[10px] overflow-hidden">

                <div className="flex items-center justify-between h-[6vh] w-[100%] bg-[#f0f0f0] text-black">
                    <p className="ml-5 font-semibold">{title}</p>
                    <div className="mr-5" onClick={(e) => {
                        e.preventDefault()
                        likeProjectMutate()
                    }}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isError ? <RotateCcw /> : <Heart className={`${liked ? "text-my-gold" : null}`} />}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard