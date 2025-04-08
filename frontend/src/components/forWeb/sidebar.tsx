import { useContext } from "react"
import { SideBarDrag } from "../../providers/sideBarSelectionProvider"
import { Button } from "../ui/button"
import { Link, useLocation } from "react-router-dom"
import { EditorContext, WebsiteContext } from "@/providers/editorProvider"
import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "@/providers/authProvider"
import { updateWebsite } from "@/api/editWebsite"
import { CommunityComponentContext } from "@/providers/communityComponentsProvider"
import { deployWebsite } from "@/api/createHosting"



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

    const { mutate: deployProject, isPending: isDeploying, isError: isDeployError } = useMutation({
        mutationFn: () => deployWebsite(id),
        onSuccess: (data) => {
            console.log("🚀 Deployed successfully:", data);
        },
        onError: (err) => {
            console.error("❌ Deployment failed:", err);
        }
    });

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
        return communitysContext.map(({ _id, title }) => <button style={{ border: "1px solid", borderRadius: "10px", width: "90%", backgroundColor: "white", color: "black" }} draggable onDrag={() => update(_id)}>{title}</button>)
    }

    const { state, update } = sideBarSelectionContext

    // const {state,update} = editorContext
    console.log(state)

    return (
        <div style={{ width: "15vw", borderLeft: "1px solid gray", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <br />
            <Button variant="auth" onClick={() => deployProject()}>
                {isDeploying ? "Deploying..." : isDeployError ? "Retry Deploy" : "Deploy"}
            </Button>
            <br />
            <br />
            <p className="font-semibold">NATIVE</p>
            <button style={{ border: "1px solid", borderRadius: "10px", width: "90%" }} draggable onDrag={() => update("Container")}>
                COMPONENT
            </button>
            <button style={{ marginTop: "5px", border: "1px solid", borderRadius: "10px", width: "90%" }} draggable onDrag={() => update("Elem")}>
                ELEMENT
            </button>
            {/* <button draggable onDrag={() => update("Button")}>
                Button
            </button> */}
            <br />
            <br />
            <p className="font-semibold">COMMUNITY</p>

            {displayCommunityComponents()}
            <br />
            <br />

            <Button variant='auth' onClick={() => createProjectMutate()}>
                {isError ? "Retry" : isPending ? "Loading..." : "Save"}
            </Button>
            <Link to="/">

            </Link>
            <Link to="/">
                <Button className="border-light">
                    Cancel
                </Button>
            </Link>
        </div>
    )
}

export default Sidebar