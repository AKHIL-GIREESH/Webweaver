import { Pencil } from "lucide-react"
import { useState } from "react"


const EditImg = ({ banner, elem }: { banner: boolean, elem: string | undefined }) => {

    const [file, setFile] = useState<File | null>(null)

    //elem = "https://fontmeme.com/images/set-in-friz-bold.png"

    return (
        <>
            <p className="font-semibold text-[1.2rem] mb-[3vh]">{banner ? "BANNER" : "DISPLAY PICTURE"}</p>
            <div className={`mb-[5vh] flex justify-center items-center ${banner ? `w-[95%] min-h-[22vh] rounded-[10px] ${elem ? `bg-[url(${elem})] cover` : "bg-black"}` : `min-h-[150px] w-[150px] rounded-full ${elem ? `bg-[url(${elem})] cover` : "bg-black"}`}`}>
                <div className=" flex justify-center items-center relative rounded-full w-[45px] h-[45px]  bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                    <input type="file" className=" hover:cursor-pointer absolute rounded-full w-[45px] h-[45px] opacity-0" />
                    <Pencil className="text-black" />
                </div>
            </div>
            {/* <div className="bg-[url(https://fontmeme.com/images/set-in-friz-bold.png)]"></div> */}
        </>
    )
}

export default EditImg