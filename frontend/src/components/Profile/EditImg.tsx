import { User } from "@/types/user"
import { Pencil, UserPen } from "lucide-react"


const EditImg = ({ banner, elem, newFileSet, setUserState }: { banner: boolean, elem: string | undefined, newFileSet: (elem: File) => void, setUserState: (elem: User | null) => void }) => {

    //const [file, setFile] = useState<File | null>(null)
    // console.log("ELEEEEM", elem)

    //elem = "https://fontmeme.com/images/set-in-friz-bold.png"
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        const selectedFile = files ? files[0] : null
        if (selectedFile) {
            newFileSet(selectedFile)
            //   setPreviewUrl(URL.createObjectURL(selectedFile))
            setUserState(prev => prev ? { ...prev, [name]: URL.createObjectURL(selectedFile) } : prev)
        }

    }

    return (
        <>
            <p className="font-semibold text-[1.2rem] mb-[3vh]">{banner ? "BANNER" : "DISPLAY PICTURE"}</p>
            <div className={`bg-black relative overflow-hidden text-black ml-[0.2vw] outline-light outline-2 outline-dashed mb-[5vh] flex justify-center items-center ${banner ? "w-[95%] min-h-[22vh] rounded-[10px]" : "min-h-[150px] w-[150px] rounded-full"}`}>
                <img className={`h-[100%] w-[100%] cover bg-black ${elem ? "opacity-100" : "opacity-0"}`} src={elem} />
                <div className=" absolute flex justify-center items-center rounded-full w-[45px] h-[45px]  bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                    <input onChange={handleFileChange} name={banner ? "banner" : "pfp"} type="file" className=" hover:cursor-pointer absolute rounded-full w-[45px] h-[45px] opacity-0" />
                    {banner ? <Pencil /> : <UserPen />}
                </div>
            </div>
            {/* <div className="bg-[url(https://fontmeme.com/images/set-in-friz-bold.png)]"></div> */}
        </>
    )
}

export default EditImg