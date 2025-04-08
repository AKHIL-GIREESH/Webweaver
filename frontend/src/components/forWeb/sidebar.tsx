import { useContext } from "react"
import { SideBarDrag } from "../../providers/sideBarSelectionProvider"
import { Button } from "../ui/button"
import { Link, useLocation } from "react-router-dom"
import { EditorContext, WebsiteContext } from "@/providers/editorProvider"
import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "@/providers/authProvider"
import { updateWebsite } from "@/api/editWebsite"
import { CommunityComponentContext } from "@/providers/communityComponentsProvider"

const Sidebar = () => {
    //const editorContext = useContext(EditorContext)
    const sideBarSelectionContext = useContext(SideBarDrag)
    const communitysContext = useContext(CommunityComponentContext)
    const editorContext = useContext(EditorContext)
    const websiteContext = useContext(WebsiteContext)
    const UserContext = useContext(AuthContext)
    const id = useLocation().pathname.split("/")[2]

    if (!sideBarSelectionContext || !editorContext || !websiteContext || !UserContext) {
        throw new Error("error")
    }

    const { mutate: createProjectMutate, isPending, isError } = useMutation({
        mutationFn: async () => {
            let newProject
            if (UserContext.user) {
                newProject = await updateWebsite({ ...websiteContext.state, code: editorContext.state, author: UserContext.user.id }, id)
            }
            // const { token, user } = newUser
            console.log("newProject works : ", newProject)

            //localStorage.setItem('user', JSON.stringify(newUser))
        }
    })

    const displayCommunityComponents = () => {
        if (!communitysContext) {
            return <p>Like community components to add them to your project</p>
        }
        return communitysContext.map(({ _id, title }) => <button draggable onDrag={() => update(_id)}>{title}</button>)
    }

    const { state, update } = sideBarSelectionContext

    // const {state,update} = editorContext
    console.log(state)

    return (
        <div style={{ width: "15vw", border: "1px solid", height: "100vh" }}>
            <button draggable onDrag={() => update("Container")}>
                Component
            </button>
            <button draggable onDrag={() => update("Elem")}>
                Element
            </button>
            <button draggable onDrag={() => update("Button")}>
                Button
            </button>
            <Button variant='auth' onClick={() => createProjectMutate()}>
                {isError ? "Retry" : isPending ? "Loading..." : "Save"}
            </Button>
            <Link to="/">
                <Button>
                    Cancel
                </Button>
            </Link>

            {displayCommunityComponents()}
        </div>
    )
}

export default Sidebar