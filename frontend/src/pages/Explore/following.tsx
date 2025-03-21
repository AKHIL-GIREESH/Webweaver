import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Following = () => {
    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { following } = UserContext.user

    if (!following || following?.length === 0) {
        return (
            <div>
                You haven't followed any.<br />
                <Link to="/explore"><Button variant="auth">Explore</Button></Link>
            </div>
        )
    }
}

export default Following