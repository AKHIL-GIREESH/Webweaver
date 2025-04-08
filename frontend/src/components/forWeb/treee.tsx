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
        return (<div className="mt-[5vh] w-[90%] flex flex-col items-center">
            {item.id}
            <br />
            <br />

            <p className="font-medium">OPACITY</p>
            <Slider defaultValue={[Number(treeElem.styles.opacity) ?? 1]} max={1} step={0.1} className="bg-black mt-6" onValueChange={(value) => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, opacity: value[0] } })} />
            <br />
            <br />
            <p className="font-medium">BACKGROUND COLOUR</p>
            <Input type="color" name="bg" value={treeElem.styles.backgroundColor} className="border border-none" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, backgroundColor: e.target.value } })} />
            <br />
            <br />
            <p className="font-medium">TEXT COLOUR</p>
            <Input type="color" name="fg" value={treeElem.styles.color} className="border border-none" onChange={e => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, color: e.target.value } })} />
            <br />
            <br />
            <p className="font-medium">MARGIN</p>
            <div className="flex justify-between">
                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.marginTop === "string"
                            ? treeElem.styles.marginTop.slice(0, -2)
                            : treeElem.styles.marginTop ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                marginTop: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.marginBottom === "string"
                            ? treeElem.styles.marginBottom.slice(0, -2)
                            : treeElem.styles.marginBottom ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                marginBottom: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.marginRight === "string"
                            ? treeElem.styles.marginRight.slice(0, -2)
                            : treeElem.styles.marginRight ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                marginRight: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.marginLeft === "string"
                            ? treeElem.styles.marginLeft.slice(0, -2)
                            : treeElem.styles.marginLeft ?? "0"
                    }
                    className="w-[25%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                marginLeft: `${e.target.value}vh`,
                            },
                        })
                    }
                />
            </div>
            <br />
            <br />
            <p className="font-medium">BORDER RADIUS</p>
            <Slider defaultValue={[Number(treeElem.styles.borderRadius) ?? 0]} max={100} step={5} className="bg-black mt-6" onValueChange={(value) => action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, borderRadius: `${value[0]}px` } })} />
            <br />
            <p className="font-medium">PADDING</p>
            <div className="flex justify-between mt-4">
                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.paddingTop === "string"
                            ? treeElem.styles.paddingTop.slice(0, -2)
                            : treeElem.styles.paddingTop ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                paddingTop: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.paddingBottom === "string"
                            ? treeElem.styles.paddingBottom.slice(0, -2)
                            : treeElem.styles.paddingBottom ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                paddingBottom: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.paddingRight === "string"
                            ? treeElem.styles.paddingRight.slice(0, -2)
                            : treeElem.styles.paddingRight ?? "0"
                    }
                    className="w-[20%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                paddingRight: `${e.target.value}vh`,
                            },
                        })
                    }
                />

                <Input
                    type="text"
                    value={
                        typeof treeElem.styles.paddingLeft === "string"
                            ? treeElem.styles.paddingLeft.slice(0, -2)
                            : treeElem.styles.paddingLeft ?? "0"
                    }
                    className="w-[25%] h-auto"
                    onChange={(e) =>
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                paddingLeft: `${e.target.value}vh`,
                            },
                        })
                    }
                />
            </div>
            <br />
            <p className="font-medium uppercase">Border Width</p>
            <Slider
                defaultValue={[
                    typeof treeElem.styles.borderWidth === "string"
                        ? parseInt(treeElem.styles.borderWidth)
                        : Number(treeElem.styles.borderWidth) || 0,
                ]}
                max={20}
                step={1}
                className="bg-black mt-6"
                onValueChange={(value) =>
                    action({
                        type: "updateStyle",
                        parent: treeElem.parent,
                        index: treeElem.id,
                        style: {
                            ...treeElem.styles,
                            borderWidth: `${value[0]}px`,
                        },
                    })
                }
            />
            <br />
            <Input
                type="color"
                value={treeElem.styles.borderColor || "#000000"}
                className="border border-none"
                onChange={(e) =>
                    action({
                        type: "updateStyle",
                        parent: treeElem.parent,
                        index: treeElem.id,
                        style: {
                            ...treeElem.styles,
                            borderColor: e.target.value,
                        },
                    })
                }
            />

            <br />
            <div className="flex flex-col items-center gap-2 mt-6">
                <p className="font-medium uppercase">Box Shadow</p>

                <div className="flex justify-center gap-2">
                    <Input
                        type="number"
                        className="w-[30%] h-auto"
                        placeholder="X"
                        value={
                            typeof treeElem.styles.boxShadow === "string"
                                ? parseInt(treeElem.styles.boxShadow.split(" ")[0])
                                : 0
                        }
                        onChange={(e) => {
                            const [_, y, blur, color] = treeElem.styles.boxShadow?.split(" ") || ["0px", "0px", "5px", "rgba(0,0,0,0.5)"];
                            const newShadow = `${e.target.value}px ${y} ${blur} ${color}`;
                            action({
                                type: "updateStyle",
                                parent: treeElem.parent,
                                index: treeElem.id,
                                style: {
                                    ...treeElem.styles,
                                    boxShadow: newShadow,
                                },
                            });
                        }}
                    />

                    <Input
                        type="number"
                        className="w-[30%] h-auto"
                        placeholder="Y"
                        value={
                            typeof treeElem.styles.boxShadow === "string"
                                ? parseInt(treeElem.styles.boxShadow.split(" ")[1])
                                : 0
                        }
                        onChange={(e) => {
                            const [x, _, blur, color] = treeElem.styles.boxShadow?.split(" ") || ["0px", "0px", "5px", "rgba(0,0,0,0.5)"];
                            const newShadow = `${x} ${e.target.value}px ${blur} ${color}`;
                            action({
                                type: "updateStyle",
                                parent: treeElem.parent,
                                index: treeElem.id,
                                style: {
                                    ...treeElem.styles,
                                    boxShadow: newShadow,
                                },
                            });
                        }}
                    />
                </div>
                <br />
                <p className="font-medium uppercase">shadow blur</p>
                <Slider
                    defaultValue={[
                        typeof treeElem.styles.boxShadow === "string"
                            ? parseInt(treeElem.styles.boxShadow.split(" ")[2])
                            : 5,
                    ]}
                    max={50}
                    step={1}
                    className="bg-black"
                    onValueChange={(value) => {
                        const [x, y, _, color] = treeElem.styles.boxShadow?.split(" ") || ["0px", "0px", "5px", "rgba(0,0,0,0.5)"];
                        const newShadow = `${x} ${y} ${value[0]}px ${color}`;
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                boxShadow: newShadow,
                            },
                        });
                    }}
                />
                <br />
                <p className="font-medium uppercase">shadow COLOUR</p>
                <Input
                    type="color"
                    value={
                        typeof treeElem.styles.boxShadow === "string"
                            ? treeElem.styles.boxShadow.split(" ")[3] || "#ffffff"
                            : "#ffffff"
                    }
                    className="border border-none"
                    onChange={(e) => {
                        const [x = "0px", y = "0px", blur = "5px"] = treeElem.styles.boxShadow?.split(" ") || [];
                        const newShadow = `${x} ${y} ${blur} ${e.target.value}`;
                        action({
                            type: "updateStyle",
                            parent: treeElem.parent,
                            index: treeElem.id,
                            style: {
                                ...treeElem.styles,
                                boxShadow: newShadow,
                            },
                        });
                    }}
                />

            </div>


            {/* <button onClick={() =>
                action({ type: "updateStyle", parent: treeElem.parent, index: treeElem.id, style: { ...treeElem.styles, backgroundColor: "green" } })
            }>Test</button> */}
        </div>)

    }




    return (
        <div className="flex flex-col items-center w-[15vw] h-[100vh] border-r border-light overflow-y-scroll">
            <br />
            <br />
            <p className="font-medium">PROJECT NAME</p>
            <Input
                type="text"
                value={title}
                className="border-light w-[90%] rounded"
                onChange={(e) => update({ ...webState, title: e.target.value })} />
            <br />
            <br />
            <div className="flex flex-col items-center">
                <p className="font-medium ">TAGS</p>
                <Input
                    className="border-light w-[90%] rounded"
                    type="text"
                    name="tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <Button className="w-[90%] bg-white text-black" onClick={() => {
                    update({ ...webState, tags: [...webState.tags, tag] })
                    setTag("")
                }}>ADD</Button>
            </div>

            <br />
            {tags.map(item => <p className="bg-white w-[80%] p-2 rounded text-black mb-[1px]">{item}</p>)}

            {outputHere()}

        </div>
    )
}

export default Treee