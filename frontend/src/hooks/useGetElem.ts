import { useContext } from "react"
import { SideBarDrag } from "../providers/sideBarSelectionProvider"
import { v4 as uuidv4 } from 'uuid';
import { EditorContainerType, EditorElementType, EditorButtonType } from "../types/editor";
import { CommunityComponentContext } from "@/providers/communityComponentsProvider";

const useGetElem = (parent: string): EditorContainerType | EditorElementType | EditorButtonType => {
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
            styles: { height: "50px", width: "50px" },
            kind: "Container",
            contents: []
        }
    }

    if (state === "Container") {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { 
                border: "1px solid", 
                minHeight: "30vh", 
                width: "60vw", 
                height: "fit-content",
            },
            kind: state,
            contents: []
        }
    } else if (state === "Elem") {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { 
                border: "1px solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                minHeight: "20px",
                width: "155px"
            },
            kind: state,
            contents: "Some text"
        }
    } else if (state === "Button") {
        return {
            parent: parent,
            id: uuidv4(),
            styles: { 
                backgroundColor: "#007bff", 
                color: "white", 
                // padding: "8px 16px", 
                borderRadius: "4px",
                cursor: "pointer",
                width: "120px",
                height: "40px",
                border: "1px solid #0056b3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "500"
            },
            kind: "Button",
            contents: "Click Me",
            url: "https://example.com"
        }
    } else {
        // Handle community components
        if (communitysContext && communitysContext.length > 0) {
            let newContainer = communitysContext.find(item => item._id === state)?.code
            if (newContainer) {
                newContainer.parent = parent
                return newContainer
            }
        }
        // Fallback for unknown state
        return {
            parent: parent,
            id: uuidv4(),
            styles: { 
                border: "1px solid", 
                minHeight: "30vh", 
                width: "60vw", 
                height: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            kind: "Container",
            contents: []
        }
    }

}

export default useGetElem