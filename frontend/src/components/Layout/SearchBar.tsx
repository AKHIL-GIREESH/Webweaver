import { Plus, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import TagsCard from "./TagsCard"
import { useState } from "react"

const Searchbar = ({ val, setVal, buttonAction, tagList, setTagList }: { val: string, setVal: (text: string) => void, buttonAction?: (text: string) => void, tagList: string[], setTagList: (text: string[]) => void }) => {
    const [tag, setTag] = useState<string>("")
    return (
        <div>
            <div className="flex border border-light rounded-full min-w-[40vw] max-w-[40vw] ml-[6vw]">
                <Input placeholder="Search" type="text" className="border-none" value={val} onChange={(e) => setVal(e.target.value)} />
                <Button onClick={() => buttonAction && buttonAction(val)}>
                    <Search className="active:none" />
                </Button>
            </div>
            <div className="flex gap-2 boder max-w-[15vw] ml-[6vw] mt-2">
                {tagList.map(item => <TagsCard name={item} setTagList={setTagList} tagList={tagList} />)}
                <Input placeholder="Add Tags" type="text" className="min-w-[10vw] max-w-[10vw] rounded-[8px] border border-light" value={tag} onChange={(e) => setTag(e.target.value)} />
                <Button variant="auth" className="w-[6vw] " onClick={() => {
                    setTagList([...tagList, tag])
                    setTag("")
                }}>Add <Plus /></Button>
            </div>
        </div>
    )
}

export default Searchbar