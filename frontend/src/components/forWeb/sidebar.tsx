import { useContext } from "react"
import { SideBarDrag } from "../../providers/sideBarSelectionProvider"

const Sidebar = () => {
    //const editorContext = useContext(EditorContext)
    const sideBarSelectionContext = useContext(SideBarDrag)

    if(!sideBarSelectionContext){
        throw new Error("error")
    }

    const {state,update} = sideBarSelectionContext

    // const {state,update} = editorContext
    console.log(state)

    return(
        <div style={{width:"10vw",border:"1px solid",height:"100vh"}}>
            <button draggable onDrag={() => update("Container")}>
                Component
            </button>
            <button draggable onDrag={() => update("Elem")}>
                Element
            </button>
        </div>
    )
}

export default Sidebar