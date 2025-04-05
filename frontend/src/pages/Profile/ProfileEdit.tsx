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
import { ArrowLeft } from "lucide-react"

const ProfileEdit = () => {

    const UserContext = useContext(AuthContext)
    const [userState, setUserState] = useState<User | null>(null)
    const [fileBanner, setFileBanner] = useState<File | null>(null)
    const [filePfp, setFilePfp] = useState<File | null>(null)

    useEffect(() => {
        if (UserContext?.user) {
            setUserState(UserContext.user)
        }
    }, [UserContext?.user])

    if (!UserContext || !UserContext.user || !userState) {
        return <>Login to continue</>
    }

    console.log(fileBanner)




    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserState((prev: User | null) => prev ? { ...prev, [name]: value } : prev)
    }

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, files } = e.target
    //     const selectedFile = files ? files[0] : null
    //     if (selectedFile) {
    //         newFileSet(selectedFile)
    //         //   setPreviewUrl(URL.createObjectURL(selectedFile))
    //         setUserState(prev => prev ? { ...prev, [name]: URL.createObjectURL(selectedFile) } : prev)
    //     }
    // }

    console.log(userState)
    const { username, email, followers, following, websites, pfp, banner, desc, twitter, github, personalWeb, linkedIn, id } = userState

    return (
        <div className="flex flex-col w-[90vw] md:w-[80vw] ml-[5vw] md:ml-[2.5vw] h-[90vh] overflow-y-scroll mt-[5vh] ">
            <Link to="/me" className="flex justify-center items-center text-black mb-[5vh] w-[40px] min-h-[40px] rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                <ArrowLeft />
            </Link>
            {/* <p className=" text-my-gold">EDIT YOUR PROFILE</p> */}
            <EditImg banner={true} elem={banner} newFileSet={setFileBanner} setUserState={setUserState} />
            <EditImg banner={false} elem={pfp} newFileSet={setFilePfp} setUserState={setUserState} />
            <div className="md:w-[50vw] font-semibold text-[1.2rem] mt-[5vh]">
                USERNAME <Input className=" rounded bg-black border-light mb-[3vh]" name="username" value={username} onChange={handleChange} />
                DESCRIPTION <Textarea className="rounded bg-black border-light resize-none mb-[3vh] min-h-[6rem]" name="desc" value={desc ? desc : ""} onChange={handleChange} />
                EMAIL <Input className="rounded bg-black border-light mb-[5vh]" name="email" value={email} onChange={handleChange} />
                <div>
                    <p>SOCIAL ACCOUNTS</p>
                    <div className="flex items-center gap-3 mb-[2vh] mt-[1vh]">
                        <FaLink className="text-[20px]" />
                        <Input className="rounded bg-black border-light " name="personalWeb" value={personalWeb ? personalWeb : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[2vh]">
                        <FaGithub className="text-[20px]" />
                        <Input className="rounded bg-black border-light" name="github" value={github ? github : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[2vh]">
                        <FaXTwitter className="text-[20px]" />
                        <Input className="rounded bg-black border-light" name="twitter" value={twitter ? twitter : ""} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-3 mb-[5vh]">
                        <FaLinkedin className="text-[20px]" />
                        <Input className="rounded bg-black border-light" name="linkedIn" value={linkedIn ? linkedIn : ""} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="flex gap-[2vw]">
                <Button variant='auth'>
                    Save
                </Button>
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