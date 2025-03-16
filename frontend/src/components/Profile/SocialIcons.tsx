import { FaLink } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SocialIconTypes } from "@/types/user";

const SocialIcons = ({ personalWeb, linkedIn, github, twitter }: SocialIconTypes) => {
    return (
        <div className="flex gap-3 mt-5 items-center md:flex-col">
            {(!personalWeb && !linkedIn && !github && !twitter) ? null :
                "Socials"}
            {
                personalWeb &&
                <a href={personalWeb}>
                    <FaLink />
                </a>
            }
            {
                linkedIn &&
                <a href={linkedIn}>
                    <FaLinkedin />
                </a>
            }
            {github &&
                <a href={github}>
                    <FaGithub />
                </a>
            }
            {twitter &&
                <a href={twitter}>
                    <FaXTwitter />
                </a>
            }
        </div>
    )
}

export default SocialIcons