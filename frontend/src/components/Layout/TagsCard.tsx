import { X } from "lucide-react"

const TagsCard = ({ name, setTagList, tagList }: { name: string, tagList: string[], setTagList: (text: string[]) => void }) => {
    return <div className="p-2 flex gap-2 justify-around items-center bg-white text-black rounded-full">{name} <X className="hover:cursor-pointer" onClick={() => setTagList(tagList.filter(item => item !== name))} /></div>
}

export default TagsCard