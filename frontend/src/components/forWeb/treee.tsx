import { useContext, useState } from "react"
import { WebBuilderSelectionContext } from "../../providers/webBuilderSelectionProvider"
import { Slider } from "@/components/ui/slider"
import { useSelectedElem } from "@/hooks/useSelectedElem"
import { EditorContext, WebsiteContext } from "@/providers/editorProvider"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Treee = () => {

    const selectedElem = useContext(WebBuilderSelectionContext)
    const editorContext = useContext(EditorContext)
    const websiteContext = useContext(WebsiteContext)
    const [tag, setTag] = useState("");

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
    const { title, tags } = webState

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
        if (!treeElem) {
            return <div>Invalid Elem</div>
        }
        return (<div className="mt-[10vh]">
            {item.id}

            <Slider defaultValue={[Number(treeElem.styles.opacity) ?? 1]} max={1} step={0.1} className="bg-black mt-6" onValueChange={(value) => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, opacity: value[0] } })} />
            <br />
            <Input type="color" name="bg" value={treeElem.styles.backgroundColor} className="border border-none" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, backgroundColor: e.target.value } })} />
            <br />
            <Input type="color" name="fg" value={treeElem.styles.color} className="border border-none" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, color: e.target.value } })} />
            <br />
            <div className="flex justify-between">
                <Input type="text" value={treeElem.styles.marginTop || 0} className="w-[20%] h-auto" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, marginTop: e.target.value } })} />
                <Input type="text" value={treeElem.styles.marginBottom || 0} className="w-[20%] h-auto" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, marginBottom: e.target.value } })} />
                <Input type="text" value={treeElem.styles.marginRight || 0} className="w-[20%] h-auto" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, marginRight: e.target.value } })} />
                <Input type="text" value={treeElem.styles.marginLeft || 0} className="w-[25%] h-auto" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, marginLeft: e.target.value } })} />
            </div>
            <br />
            <Slider defaultValue={[Number(treeElem.styles.borderRadius) ?? 0]} max={100} step={5} className="bg-black mt-6" onValueChange={(value) => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, borderRadius: `${value[0]}px` } })} />
            <br />
            <button onClick={() =>
                action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, backgroundColor: "green" } })
            }>Test</button>
        </div>)

    }




    return (
        <div className="w-[15vw] h-[100vh] border">
            <br />
            <br />

            <Input
                type="text"
                value={title}
                className="border"
                onChange={(e) => update({ ...webState, title: e.target.value })} />
            <br />
            <br />
            <div>
                <Input
                    type="text"
                    name="tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <Button onClick={() => {
                    update({ ...webState, tags: [...webState.tags, tag] })
                    setTag("")
                }}>ADD</Button>
            </div>


            {tags.map(item => <p className="bg-gray-500">{item}</p>)}
            <br />
            <br />

            {outputHere()}

        </div>
    )
}

export default Treee