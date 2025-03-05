import { EditorContext } from "@/providers/editorProvider"
import { EditorContainerType, EditorElementType } from "@/types/editor"
import { useContext } from "react"

export const useSelectedElem = () => {

    const findElem = (container: EditorContainerType, parent: string, index: string): EditorContainerType | EditorElementType | null => {
        if (container.id == index) {
            if (Array.isArray(container.contents)) {
                console.log(container)
                return container
            }
        }

        if (Array.isArray(container.contents)) {
            for (const item of container.contents) {
                return findElem(item as EditorContainerType, parent, index);;
            }
        }

        return null
    }

    const editorContext = useContext(EditorContext)

    if (!editorContext) {
        throw new Error("useSelectElem editor context empty")
    }

    const { state } = editorContext

    if (!state) {
        throw new Error("Elements empty")
    }

    return { state, findElem }



}
