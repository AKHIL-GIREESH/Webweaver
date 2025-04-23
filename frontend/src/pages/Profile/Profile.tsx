import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider";
import { useContext } from "react";
import ProfileCard from "@/components/Profile/ProfileCard";

const Profile = () => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { id, username, email, followers, following, websites, pfp, banner, desc, twitter, github, personalWeb, linkedIn } = UserContext.user
    return (
        <ProfileCard id={id} username={username} followers={followers} following={following} websites={websites} pfp={pfp} banner={banner} desc={desc} twitter={twitter} github={github} personalWeb={personalWeb} linkedIn={linkedIn} />
        // <div className="flex flex-col w-[100vw] md:w-[85vw] min-h-[100vh] h-fit ">
        //     <div className="h-[22vh] bg-lightt">
        //         {banner && <img src={banner} className="h-full w-full cover" />}
        //     </div>
        //     <div className="h-fit self-center w-[92%] ">
        //         <div className="flex justify-between mt-3 h-fit">
        //             <img className="h-[120px] w-[120px] rounded-full -translate-y-[60px]" src={pfp ? pfp : defaultPfp}></img>
        //             {/* <button className="bg-white border border-none">Edit</button> */}
        //             <Link to="./edit"><Button variant="edit">Edit Profile</Button></Link>
        //         </div>
        //         <div className="mt-[-40px] md:flex md:justify-between ">
        //             <div>
        //                 <h1 className="font-extrabold uppercase">{username}</h1>
        //                 {desc ? <p className="md:mt-[10px]">{desc}</p> : null}
        //                 {/* <p className="md:mt-[10px] text-grey-400 italic">[ Tell the World about Yourself! Click 'Edit Profile' to add a description ]</p> */}
        //                 <br />
        //                 <Follow followers={followers} following={following} />
        //             </div>
        //             <SocialIcons personalWeb={personalWeb} linkedIn={linkedIn} github={github} twitter={twitter} />
        //         </div>
        //     </div>
        //     <WebCompLiked />
        // </div>
    )
}

export default Profile