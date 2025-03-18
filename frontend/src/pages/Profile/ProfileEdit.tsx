import EditBanner from "@/components/Profile/EditBanner"
import EditPfp from "@/components/Profile/EditPfp"
import { Input } from "@/components/ui/input"
import { AuthContext } from "@/providers/authProvider"
import { User } from "@/types/user"
import { useContext, useEffect, useState } from "react"

const ProfileEdit = () => {

    const UserContext = useContext(AuthContext)
    const [userState, setUserState] = useState<User | null>(null)

    useEffect(() => {
        if (UserContext?.user) {
            setUserState(UserContext.user)
        }
    }, [UserContext?.user])

    if (!UserContext || !UserContext.user || !userState) {
        return <>Login to continue</>
    }




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserState(prev => prev ? { ...prev, [name]: value } : prev)
    }

    console.log(userState)
    const { username, email, followers, following, website, pfp, banner, desc, twitter, github, personalWeb, linkedIn, id } = userState

    return (
        <div className="flex flex-col">
            <h1>Edit Your Profile</h1>
            {username}
            <Input className="rounded" name="username" value={userState.username} onChange={handleChange} />
            <EditBanner />
            <EditPfp />
        </div>
    )
}

export default ProfileEdit