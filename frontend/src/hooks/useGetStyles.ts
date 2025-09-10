import { useContext } from "react";
import { SideBarDrag } from "../providers/sideBarSelectionProvider";
import { elementKind } from "../types/editor";

export const useGetStyles = () => {
    const sideBarSelectionContext = useContext(SideBarDrag);

    if (!sideBarSelectionContext) {
        throw new Error("Error: SideBarDrag context not found");
    }

    const { state } = sideBarSelectionContext;

    const selectStyle = (state: elementKind | null) => {
        if (state === "Container") {
            return { 
                border: "1px solid", 
                minHeight: "30vh", 
                width: "60vw", 
                height: "fit-content", 
                backgroundColor: "white", 
                opacity: "50%", 
            };
        } else if (state === "Elem") {
            return { 
                backgroundColor: "white", 
                opacity: "50%", 
                minHeight: "2.5vh",          
                width: "15vw",               
                color: "black",
                padding: "1vh 1vw"           
            };
        } else if (state === "Button") {
            return { 
                backgroundColor: "#007bff", 
                opacity: "50%", 
                color: "white", 
                padding: "1vh 2vw",          
                borderRadius: "0.4vh",       
                cursor: "pointer",
                width: "12vw",               
                height: "4vh",               
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2vh",           
                fontWeight: "500",
            };
        } else {
            return { 
                border: "1px solid", 
                minHeight: "20vh", 
                width: "20vw", 
                height: "fit-content", 
                backgroundColor: "white", 
                opacity: "50%", 
                color: "black",
            };
        }
    }

    return selectStyle(state);
}
