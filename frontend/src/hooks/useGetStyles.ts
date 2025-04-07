import { useContext } from "react";
import { SideBarDrag } from "../providers/sideBarSelectionProvider";
import { elementKind } from "../types/editor";

export const useGetStyles = () => {
    const sideBarSelectionContext = useContext(SideBarDrag)

    if (sideBarSelectionContext == null) {
        throw new Error("Error")
    }

    const { state } = sideBarSelectionContext

    const selectStyle = (state: elementKind | null) => {
        if (state == "Container") {
            return { border: "1px solid", minHeight: "30vh", width: "60vw", height: "fit-content", backgroundColor: "white", opacity: "50%", color: "black" }
        } else if (state == "Elem") {
            return { backgroundColor: "white", opacity: "50%", minHeight: "20px", width: "155px", color: "black" }
        } else {
            return { border: "1px solid", minHeight: "200px", width: "200px", height: "fit-content", backgroundColor: "white", opacity: "50%", color: "black" }
        }
    }

    return selectStyle(state)
}