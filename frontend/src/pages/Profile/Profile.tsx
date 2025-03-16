import { Button } from "@/components/ui/button"
import { FaLink } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthContext } from "@/providers/authProvider";
import { useContext } from "react";

const Profile = () => {

    const UserContext = useContext(AuthContext)

    if(!UserContext || !UserContext.user){
        return <>Login to continue</>
    }

    const {username,email,followers,following,website,pfp,desc,twitter,github,personalWeb,linkedIn} = UserContext.user

    return(
        <div className="flex flex-col w-[100vw] md:ml-[15vw] md:w-[85vw] min-h-[100vh] h-fit ">
            <div className="h-[22vh] border">
                
            </div>
            <div className="h-fit self-center w-[92%] ">
                <div className="flex justify-between mt-3 h-fit">
                    <img className="h-[120px] w-[120px] rounded-full -translate-y-[60px]" src="https://i.pinimg.com/1200x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"></img>
                    {/* <button className="bg-white border border-none">Edit</button> */}
                    <Button variant="edit">Edit Profile</Button>
                </div>
                <div className="mt-[-40px] md:flex md:justify-between ">
                    <div>
                        <h1 className="font-extrabold uppercase">{username}</h1>
                        {desc?<p className="md:mt-[10px]">{desc}</p>:<p className="md:mt-[10px] text-grey-400 italic">[ Tell the World about Yourself! Click 'Edit Profile' to add a description ]</p>}
                        <br/>
                        <div className="flex gap-10">
                            <p><b>{following?following.length : 0}</b> Following</p> <p><b>{followers?followers.length : 0}</b> Followers</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5 items-center md:flex-col">
                        Socials
                        {
                            personalWeb && 
                            <a href={personalWeb}>
                                <FaLink />
                            </a>
                        }
                        {<a href={linkedIn?linkedIn:"#"}>
                            <FaLinkedin />
                        </a>}
                        {<a href={github?github:"#"}>
                            <FaGithub />
                        </a>} 
                        {<a href={twitter?twitter:"#"}>
                            <FaXTwitter />
                        </a>} 
                    </div>
                </div>
            </div>
            <div className="mt-[8vh] md:mt-[12vh]">
                <div className="flex justify-evenly text-xl font-bold">
                    <p>WEBSITES</p>
                    <p>COMPONENTS</p>
                </div>
                <hr className="text-light"/>
            </div>
        </div>
    )
}

export default Profile