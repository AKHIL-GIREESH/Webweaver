import { useContext } from "react"
import logo from "../../assets/logo.webp"
import defaultPfp from "../../assets/defaultpfp.webp"
import { AuthContext } from "@/providers/authProvider"
import { Link, useLocation } from "react-router-dom"
import { Blocks, ChartCandlestick, Compass, Globe, Heart, UserRoundCheck } from "lucide-react"


const MainSidebar = () => {

    const path = useLocation().pathname.slice(0, 15)
    console.log(path)

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { username, pfp } = UserContext.user

    return (
        <div className={`hidden ${path === "/websitebuilder" ? "" : "md:flex"} flex-col w-[15vw] h-[100vh] border-r-1 border-light`}>
            <img src={logo} className="h-0 h-[8vh] mt-5" />
            <div className="flex flex-col h-[80vh] justify-evenly items-start">
                <Link to="/" className="nav-icons">
                    <Blocks /> Projects
                </Link>
                <Link to="/explore" className="nav-icons">
                    <Compass /> Explore
                </Link>
                <Link to="/favourites" className="nav-icons">
                    <Heart /> Favourites
                </Link>
                <Link to="/following" className="nav-icons">
                    <UserRoundCheck className="text-gold" /> Following
                </Link>
                <Link to="/dashboard" className="nav-icons">
                    <ChartCandlestick /> Dashboard
                </Link>
                <Link to="/host" className="nav-icons">
                    <Globe /> Host
                </Link>
            </div>
            <Link to="/me">
                <div className="flex items-center justify-center gap-3">
                    <img src={pfp ? pfp : defaultPfp} className="rounded-full h-0 md:h-[5vh]" />
                    <div>
                        <p className="font-bold text-lg uppercase">{username}</p>
                        <p className="text-gray-200 text-sm ">View Profile</p>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default MainSidebar