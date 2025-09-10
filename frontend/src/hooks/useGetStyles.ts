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
            return { 
                border: "1px solid", 
                minHeight: "30vh", 
                width: "60vw", 
                height: "fit-content", 
                backgroundColor: "white", 
                opacity: "50%", 
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }
        } else if (state == "Elem") {
            return { 
                backgroundColor: "white", 
                opacity: "50%", 
                minHeight: "20px", 
                width: "155px", 
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px"
            }
        } else if (state == "Button") {
            return { 
                backgroundColor: "#007bff", 
                opacity: "50%", 
                color: "white", 
                padding: "8px 16px", 
                borderRadius: "4px",
                cursor: "pointer",
                width: "120px",
                height: "40px",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "500",
                borderWidth:"0px !important"
            }
        } else {
            return { 
                border: "1px solid", 
                minHeight: "200px", 
                width: "200px", 
                height: "fit-content", 
                backgroundColor: "white", 
                opacity: "50%", 
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    }

    return selectStyle(state)
}