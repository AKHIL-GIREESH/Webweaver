import { createContext, useState } from "react";
import { elementKind, webBuilderSelection, webBuilderSelectionContext } from "../types/editor";


export const WebBuilderSelectionContext = createContext<webBuilderSelectionContext | null >(null)

const WebBuilderSelectionProvider = ({children}:React.PropsWithChildren) => {
    const [webBuilderSelection,setWebBuilderSelection] = useState<webBuilderSelection|null>(null)

    console.log(webBuilderSelection)
    return(
        <WebBuilderSelectionContext.Provider value={{
            item:webBuilderSelection,
            update: setWebBuilderSelection
        }}>
            {children}
        </WebBuilderSelectionContext.Provider>
    )
}

export default WebBuilderSelectionProvider