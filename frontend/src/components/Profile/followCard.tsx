import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"
import { Button } from "../ui/button"

const FollowCard = ({ isfollowing, userData }: { isfollowing: boolean, userData: any }) => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    let userList
    if (isfollowing) {
        userList = UserContext.user.following
    } else {
        userList = UserContext.user.followers
    }

    const check = userList?.includes(userData.id)

    return (
        <div className="flex mt-[10px] items-center justify-around">
            <p>{userData.username}</p>
            <Button variant="auth">{check ? isfollowing ? "following" : "follows You" : "follow"}</Button>
        </div>
    )
}

export default FollowCard