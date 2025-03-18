import EditImg from "@/components/Profile/EditImg"
import EditPfp from "@/components/Profile/EditPfp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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




    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserState(prev => prev ? { ...prev, [name]: value } : prev)
    }

    console.log(userState)
    const { username, email, followers, following, website, pfp, banner, desc, twitter, github, personalWeb, linkedIn, id } = userState

    return (
        <div className="flex flex-col">
            <EditImg />
            <EditImg />
            <h1>Edit Your Profile</h1>
            Username <Input className="rounded" name="username" value={username} onChange={handleChange} />
            Description <Textarea className="rounded resize-none" name="desc" value={desc ? desc : ""} onChange={handleChange} />
            Email <Input className="rounded" name="email" value={email} onChange={handleChange} />
            <Input className="rounded" name="twitter" value={twitter ? twitter : ""} onChange={handleChange} />
            <Input className="rounded" name="github" value={github ? github : ""} onChange={handleChange} />
            <Input className="rounded" name="linkedIn" value={linkedIn ? linkedIn : ""} onChange={handleChange} />
            <Input className="rounded" name="personalWeb" value={personalWeb ? personalWeb : ""} onChange={handleChange} />

        </div>
    )
}

export default ProfileEdit