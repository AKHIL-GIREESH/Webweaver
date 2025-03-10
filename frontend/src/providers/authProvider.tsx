import { createContext, useState } from "react";
import { elementKind, sideBarSelectionContext } from "../types/editor";


export const SideBarDrag = createContext<sideBarSelectionContext | null >(null)

const AuthProvider = ({children}:React.PropsWithChildren) => {
    const [sideBarSelection,setSideBarSelection] = useState<elementKind|null>(null)

    return(
        <SideBarDrag.Provider value={{
            state:sideBarSelection,
            update: setSideBarSelection
        }}>
            {children}
        </SideBarDrag.Provider>
    )
}

export default AuthProvider