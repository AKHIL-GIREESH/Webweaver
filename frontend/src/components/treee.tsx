import { useContext } from "react"
import { WebBuilderSelectionContext } from "../providers/webBuilderSelectionProvider"
import { Slider } from "@/components/ui/slider"
import { useSelectedElem } from "@/hooks/useSelectedElem"
import { EditorContext } from "@/providers/editorProvider"

const Treee = () => {

    const selectedElem = useContext(WebBuilderSelectionContext)
    const editorContext = useContext(EditorContext)

    const {state,findElem} = useSelectedElem()
    

    
    if (!selectedElem || !editorContext){
        throw new Error("Treee issue")
    }

    const {action} = editorContext
    
    if(!EditorContext){
        throw new Error("No Editor context it seems in tree")
    }

    const {item} = selectedElem

    if(!item){
        return (
            <div className="w-[10vw] h-[100vh] border">
                <p>Select an Element to edit</p>
            </div>
        )
    }

    const treeElem = findElem(state,item.parent,item.id)
    console.log(treeElem)

    return(
        <div className="w-[10vw] h-[100vh] border">
            
            <div className="mt-[10vh]">
                {item.id}
                
                <Slider defaultValue={[10]} max={100} step={1} className="bg-black mt-6"/>
                <button onClick={() => {
                    treeElem && action({type:"updateStyle",parent:treeElem.parent,index:treeElem.id,style:treeElem.styles})
                }}>Test</button>
            </div>
        </div>
    )
}

export default Treee