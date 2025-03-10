import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"

export const useUser = () => {
    const context = useContext(AuthContext)
    if (context === null) {
        return null
    } else {
        const { user } = context
        console.log(context)
        return user
    }
}