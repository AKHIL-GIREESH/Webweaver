import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Dashboard = () => {
    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { website } = UserContext.user

    if (!website || website?.length === 0) {
        return (
            <div>
                You don't have any Projects<br />
                <Link to="/"><Button variant="auth">Projects</Button></Link>
            </div>
        )
    }
}

export default Dashboard