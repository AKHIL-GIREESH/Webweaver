import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider";
import { useContext } from "react";
import SocialIcons from "@/components/Profile/SocialIcons";
import WebCompLiked from "@/components/Profile/WebCompLiked";
import Follow from "@/components/Profile/Follow";
import { Link } from "react-router-dom";

const Profile = () => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { username, email, followers, following, website, pfp, banner, desc, twitter, github, personalWeb, linkedIn } = UserContext.user

    return (
        <div className="flex flex-col w-[100vw] md:ml-[15vw] md:w-[85vw] min-h-[100vh] h-fit ">
            <div className="h-[22vh] bg-lightt">
                <img src={banner ? banner : "https://fontmeme.com/images/set-in-friz-bold.png"} className="h-full w-full cover" />
            </div>
            <div className="h-fit self-center w-[92%] ">
                <div className="flex justify-between mt-3 h-fit">
                    <img className="h-[120px] w-[120px] rounded-full -translate-y-[60px]" src={pfp ? pfp : "https://i.pinimg.com/1200x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"}></img>
                    {/* <button className="bg-white border border-none">Edit</button> */}
                    <Link to="./edit"><Button variant="edit">Edit Profile</Button></Link>
                </div>
                <div className="mt-[-40px] md:flex md:justify-between ">
                    <div>
                        <h1 className="font-extrabold uppercase">{username}</h1>
                        {desc ? <p className="md:mt-[10px]">{desc}</p> : null}
                        {/* <p className="md:mt-[10px] text-grey-400 italic">[ Tell the World about Yourself! Click 'Edit Profile' to add a description ]</p> */}
                        <br />
                        <Follow followers={followers} following={following} />
                    </div>
                    <SocialIcons personalWeb={personalWeb} linkedIn={linkedIn} github={github} twitter={twitter} />
                </div>
            </div>
            <WebCompLiked />
        </div>
    )
}

export default Profile