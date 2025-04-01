import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import Follow from "./Follow"
import SocialIcons from "./SocialIcons"
import WebCompLiked from "./WebCompLiked"
import defaultPfp from "../../assets/defaultpfp.webp"

const ProfileCard = ({ username, followers, following, websites, pfp, banner, desc, twitter, github, personalWeb, linkedIn }: any) => {
    return (
        <div className="flex flex-col w-[100vw] md:w-[85vw] min-h-[100vh] h-fit ">
            <div className="h-[22vh] bg-lightt">
                {banner && <img src={banner} className="h-full w-full cover" />}
            </div>
            <div className="h-fit self-center w-[92%] ">
                <div className="flex justify-between mt-3 h-fit">
                    <img className="h-[120px] w-[120px] rounded-full -translate-y-[60px]" src={pfp ? pfp : defaultPfp}></img>
                    {/* <button className="bg-white border border-none">Edit</button> */}
                    <Link to="./edit"><Button variant="edit">Edit Profile</Button></Link>
                </div>
                <div className="mt-[-40px] ml-0 md:flex md:justify-between ">
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

export default ProfileCard