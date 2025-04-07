import { useState } from "react"

const WebCompLiked = () => {
    const [selection, setSelection] = useState("WEBSITES")
    return (
        <div className="mt-[8vh] md:mt-[12vh]">
            <div className="flex justify-center gap-10 font-medium">
                {["COMPONENTS", "LIKED"].map(item => <p className={`py-[10px] w-[12vw] text-center rounded-full bg-white text-black`}>{item}</p>)}
            </div>
        </div>
    )
}

export default WebCompLiked