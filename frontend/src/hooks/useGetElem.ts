import { useContext } from "react"
import { SideBarDrag } from "../providers/sideBarSelectionProvider"
import { v4 as uuidv4 } from 'uuid';
import { EditorContainerType, EditorElementType } from "../types/editor";
import { CommunityComponentContext } from "@/providers/communityComponentsProvider";

const useGetElem = (parent: string): EditorContainerType | EditorElementType => {
    const sideBarSelectionContext = useContext(SideBarDrag)
    const communitysContext = useContext(CommunityComponentContext)

    if (sideBarSelectionContext == null) {
        throw new Error("idk")
    }

    const { state } = sideBarSelectionContext
    if (!state) {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { height: "50px", width: "50px", backgroundColor: "red" },
            kind: "Container",
            contents: null
        }
    }

    if (state === "Container") {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { border: "1px solid red", minHeight: "200px", width: "200px", height: "fit-content", resize: "both", overflow: "auto", backgroundColor: "red" },
            kind: state,
            contents: null
        }
    } else if (state === "Elem") {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { border: "1px solid" },
            kind: state,
            contents: "Some text"
        }
    } else {
        let newContainer = communitysContext?.filter(item => item._id !== state)[0].code
        if (newContainer) {
            newContainer.parent = parent
            return newContainer
        }
        return {
            parent: parent,
            id: uuidv4(),
            styles: { border: "1px solid red", minHeight: "200px", width: "200px", height: "fit-content", resize: "both", overflow: "auto", backgroundColor: "red" },
            kind: "Container",
            contents: null
        }
    }

}

export default useGetElem