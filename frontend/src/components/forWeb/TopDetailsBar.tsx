import { Link } from "react-router-dom"
import { ArrowLeft, Heart } from "lucide-react"

const TopDetailsBar = ({ author, title, like, setLike, pfp }: { author: string, title: string, like: boolean, setLike: (val: boolean) => void, pfp: string }) => {
    return (
        <div className="flex items-center h-[12vh] bg-[#121212] border-b border-light">
            <Link to="/explore" className="flex justify-center items-center text-black w-[40px] min-h-[40px] rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b] ml-6">
                <ArrowLeft />
            </Link>
            <p className="ml-30 text-xl">{author} / {title}</p>
            <div className="ml-auto mr-6 flex justify-center items-center gap-5">
                <Heart className={`${like ? "text-my-gold" : null}`} />
                <Link to={`/u/${author}`}><div className="w-[40px] h-[40px] bg-white rounded-full">
                </div></Link>
            </div>
        </div>
    )
}

export default TopDetailsBar