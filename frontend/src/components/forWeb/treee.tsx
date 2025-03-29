import { useContext } from "react"
import { WebBuilderSelectionContext } from "../../providers/webBuilderSelectionProvider"
import { Slider } from "@/components/ui/slider"
import { useSelectedElem } from "@/hooks/useSelectedElem"
import { EditorContext, WebsiteContext } from "@/providers/editorProvider"
import { Input } from "../ui/input"
import { websiteContextData } from "@/types/editor"

const Treee = () => {

    const selectedElem = useContext(WebBuilderSelectionContext)
    const editorContext = useContext(EditorContext)
    const websiteContext = useContext(WebsiteContext)

    const { state, findElem } = useSelectedElem()



    if (!selectedElem || !editorContext || !websiteContext) {
        throw new Error("Treee issue")
    }

    const { action } = editorContext
    const { state: webState, update } = websiteContext

    if (!EditorContext) {
        throw new Error("No Editor context it seems in tree")
    }

    const { item } = selectedElem
    const { title } = webState

    const outputHere = () => {
        if (!item) {
            return (
                <div>
                    <p>Select an Element to edit</p>
                </div>
            )
        }

        const treeElem = findElem(state, item.parent, item.id)
        console.log(treeElem)
        return (<div className="mt-[10vh]">
            {item.id}

            <Slider defaultValue={[10]} max={100} step={1} className="bg-black mt-6" />
            <button onClick={() => {
                treeElem && action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, backgroundColor: "green" } })
            }}>Test</button>
        </div>)

    }




    return (
        <div className="w-[10vw] h-[100vh] border">
            <br />
            <br />

            <Input
                type="text"
                value={title}
                className="border"
                onChange={(e) => update({ ...webState, title: e.target.value })} />

            {outputHere()}

        </div>
    )
}

export default Treee