import EditImg from "@/components/Profile/EditImg"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AuthContext } from "@/providers/authProvider"
import { User } from "@/types/user"
import { useContext, useEffect, useState } from "react"
import { FaLink } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { createAssets } from "@/api/createAssets"
import { updateProfile } from "@/api/updateProfile"

const ProfileEdit = () => {
    const UserContext = useContext(AuthContext)
    const [userState, setUserState] = useState<User | null>(null)
    const [fileBanner, setFileBanner] = useState<File | null>(null)
    const [filePfp, setFilePfp] = useState<File | null>(null)


    const { mutateAsync: uploadProfileAsset, isPending, data } = useMutation({
        mutationFn: async () => {
            if (!UserContext?.user?.id) throw new Error("User not found")
            let pfpData: null | string = null, bannerData: null | string = null

            console.log(filePfp)
            console.log(fileBanner)

            if (filePfp) {
                pfpData = await createAssets(UserContext.user.id, filePfp)
            }
            if (fileBanner) {
                bannerData = await createAssets(UserContext.user.id, fileBanner)
            }

            return { pfpData, bannerData }
        }
    })

    const { mutate: editProfile, isPending: isEditing } = useMutation({
        mutationFn: async () => {
            if (!UserContext?.user?.id) throw new Error("User not found")
            const resp = await uploadProfileAsset()

            if (resp.pfpData) {
                setUserState((prev: any) => prev ? { ...prev, pfp: resp.pfpData } : prev)
            }
            if (resp.bannerData) {
                setUserState((prev: any) => prev ? { ...prev, banner: resp.bannerData } : prev)
            }

            updateProfile(UserContext.user.id, userState)

            // if( resp.pfpData){
            //     setUserState((prev: User | null) => prev ? { ...prev, pfp: data.pfpData } : prev)
            // }
            // console.log(pfpData)
            // console.log(bannerData)
            // console.log(pfpData)
            // console.log(bannerData)// 
        }
    })

    useEffect(() => {
        if (UserContext?.user) {
            setUserState(UserContext.user)
        }
    }, [UserContext?.user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserState((prev: User | null) => prev ? { ...prev, [name]: value } : prev)
    }

    if (!UserContext || !UserContext.user || !userState) {
        return <>Login to continue</>
    }

    console.log(data)

    const { username, email, followers, following, websites, pfp, banner, desc, twitter, github, personalWeb, linkedIn, id } = userState

    return (
        <div className="flex flex-col w-[90vw] md:w-[80vw] ml-[5vw] md:ml-[2.5vw] h-[90vh] overflow-y-scroll mt-[5vh] text-[#f0f0f0]">
            <Link to="/me" className="flex justify-center items-center text-black mb-[5vh] w-[40px] min-h-[40px] rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                <ArrowLeft />
            </Link>
            <EditImg banner={true} elem={banner} newFileSet={setFileBanner} setUserState={setUserState} />
            <EditImg banner={false} elem={pfp} newFileSet={setFilePfp} setUserState={setUserState} />
            <div className="md:w-[50vw] font-semibold text-[1.2rem] mt-[5vh]">
                USERNAME <Input className=" rounded bg-[#121212] border-light mb-[3vh]" name="username" value={username} onChange={handleChange} />
                DESCRIPTION <Textarea className="rounded bg-[#121212] border-light resize-none mb-[3vh] min-h-[6rem]" name="desc" value={desc ? desc : ""} onChange={handleChange} />
                EMAIL <Input className="rounded bg-[#121212] border-light mb-[5vh]" name="email" value={email} onChange={handleChange} />
                <div>
                    <p>SOCIAL ACCOUNTS</p>
                    <div className="flex items-center gap-3 mb-[2vh] mt-[1vh]">
                        <FaLink className="text-[20px]" />
                        <Input className="rounded bg-[#121212] border-light " name="personalWeb" value={personalWeb ? personalWeb : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[2vh]">
                        <FaGithub className="text-[20px]" />
                        <Input className="rounded bg-[#121212] border-light" name="github" value={github ? github : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[2vh]">
                        <FaXTwitter className="text-[20px]" />
                        <Input className="rounded bg-[#121212] border-light" name="twitter" value={twitter ? twitter : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[5vh]">
                        <FaLinkedin className="text-[20px]" />
                        <Input className="rounded bg-[#121212] border-light" name="linkedIn" value={linkedIn ? linkedIn : ""} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="flex gap-[2vw]">
                {isPending || isEditing ? <Button variant="auth" disabled>Saving...
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button> : <Button variant='auth' onClick={() => editProfile()}>
                    Save
                </Button>}
                <Link to="/me">
                    <Button variant="inverse" style={{ backgroundColor: "white" }}>
                        Cancel
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ProfileEdit