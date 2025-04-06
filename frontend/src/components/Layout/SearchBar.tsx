import { Plus, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Searchbar = ({ val, setVal, buttonAction, tagList, setTagList }: { val: string, setVal: (text: string) => void, buttonAction?: (text: string) => void, tagList: string[], setTagList: (text: string[]) => void }) => {
    return (
        <div className="flex">
            <div className="flex border border-light rounded-full min-w-[40vw] max-w-[40vw] ml-[6vw]">
                <Input placeholder="Search" type="text" className="border-none" value={val} onChange={(e) => setVal(e.target.value)} />
                <Button onClick={() => buttonAction && buttonAction(val)}>
                    <Search className="active:none" />
                </Button>
            </div>
            <div className="flex">
                <Input type="text" className="rounded-[8px] border border-light" />
                <Button variant="auth" className="max-w-[6vw] ">Add <Plus /></Button>
            </div>
        </div>
    )
}

export default Searchbar