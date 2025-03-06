import { EditorContext } from "@/providers/editorProvider"
import { EditorContainerType, EditorElementType } from "@/types/editor"
import { useContext } from "react"

export const useSelectedElem = () => {

    const findElem = (container: EditorContainerType, parent: string, index: string): EditorElementType | EditorContainerType | null => {
        if (container.id == index) {
            return container;
        }

        if (Array.isArray(container.contents)) {
            for (const item of container.contents) {
                const found = findElem(item as EditorContainerType, parent, index);
                if (found) return found;
            }
        }

        return null;
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
