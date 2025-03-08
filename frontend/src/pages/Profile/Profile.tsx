import { Button } from "@/components/ui/button"
import { FaLink } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Profile = () => {
    return(
        <div className="flex flex-col w-[100vw] md:ml-[15vw] md:w-[85vw] min-h-[100vh] h-fit ">
            <div className="h-[22vh] border">
                
            </div>
            <div className="h-fit self-center w-[92%] ">
                <div className="flex justify-between mt-3 h-fit">
                    <img className="h-[120px] w-[120px] rounded-full -translate-y-[60px] bg-white"></img>
                    {/* <button className="bg-white border border-none">Edit</button> */}
                    <Button variant="edit">Edit Profile</Button>
                </div>
                <div className="mt-[-40px] md:flex md:justify-between ">
                    <div>
                        <h1 className="font-extrabold">USERNAME</h1>
                        <p className="md:mt-[10px]">Lorem ipsum dolor sit amet. Sed dolores assumenda nam voluptate pariatur aut nihil quibusdam est accusamus</p>
                        <br/>
                        <div className="flex gap-10">
                            <p><b>{120}</b> Following</p> <p><b>{80}</b> Followers</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5 items-center md:flex-col">
                        Socials 
                        <FaLink />
                        <FaLinkedin />
                        <FaGithub />
                        <FaXTwitter />
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