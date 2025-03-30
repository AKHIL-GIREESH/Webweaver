// import { createWebsite } from "@/api/createWebsite"
// import { AuthContext } from "@/providers/authProvider"
// import { useMutation } from "@tanstack/react-query"
import { Loader2, Plus, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"
// import { useContext } from "react"
// import { useNavigate } from "react-router-dom"

const ProjectCard = ({ id, title }: { id: string, title: string }) => {

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

    return (
        <Link to={id}>
            <div className="flex items-center justify-center outline-light outline-2 h-[35vh] w-[30vw] bg-black rounded-[10px]">
                <div className="h-[5vh] bg-gray-500">
                    <p>Hello{title}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard