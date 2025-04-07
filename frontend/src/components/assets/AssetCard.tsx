import { Link } from "react-router-dom"

const AssetCard = ({ url, filename }: { url: string, filename: string }) => {
    return (
        <Link to={url} className="ml-[6vw] mb-[5vh]">
            <div className="flex items-end outline-light outline-2 h-[35vh] w-[30vw] bg-[#121212] rounded-[10px] overflow-hidden">

                <div className="flex items-center justify-between h-[6vh] w-[100%] bg-[#f0f0f0] text-black">
                    <p className="ml-5 font-semibold">{filename}</p>
                </div>
            </div>
        </Link>
    )
}

export default AssetCard