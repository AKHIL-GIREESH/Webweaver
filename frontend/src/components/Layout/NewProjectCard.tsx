import { createWebsite } from "@/api/createWebsite"
import { AuthContext } from "@/providers/authProvider"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Plus, RotateCcw } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const NewProjectCard = () => {

    const UserContext = useContext(AuthContext)
    const navi = useNavigate()

    if (!UserContext) {
        throw new Error("error")
    }

    const { mutate: createProjectMutate, isPending, isError } = useMutation({
        mutationFn: async () => {
            let newProject
            if (UserContext.user) {
                newProject = await createWebsite({ title: "Untitled Project", author: UserContext.user.id })
            }
            // const { token, user } = newUser
            console.log("newProject works : ", newProject)
            navi(`/websitebuilder/${newProject.website._id}`)

        }
    })

    return (
        <div className="ml-[6vw] flex items-center justify-center outline-light outline-2 h-[35vh] w-[30vw] outline-dashed bg-black rounded-[10px]">
            {isPending ?
                <div><Loader2 className="mr-2 h-4 w-4 animate-spin" /></div> :
                <div className="p-3 rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]" onClick={() => createProjectMutate()}>
                    {isError ? <RotateCcw /> : <Plus />}
                </div>}
        </div>
    )
}

export default NewProjectCard