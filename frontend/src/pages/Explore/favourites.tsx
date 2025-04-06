import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Favourite = () => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { liked } = UserContext.user

    if (!liked || liked?.length === 0) {
        return (
            <div>
                <p>Handpicked By You</p>
                You haven't liked any.<br />
                <Link to="/explore"><Button variant="auth">Explore</Button></Link>
            </div>
        )
    }

}

export default Favourite