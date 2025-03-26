import { useState } from "react"

const WebCompLiked = () => {
    const [selection, setSelection] = useState("WEBSITES")
    return (
        <div className="mt-[8vh] md:mt-[12vh]">
            <div className="flex justify-center gap-10 font-medium">
                {["WEBSITES", "COMPONENTS", "LIKED"].map(item => <p className="px-[30px] py-[10px] rounded-full bg-white text-black">{item}</p>)}
            </div>
        </div>
    )
}

export default WebCompLiked