import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Searchbar = ({ val, setVal, buttonAction }: { val: string, setVal: (text: string) => void, buttonAction?: (text: string) => void }) => {
    return (
        <div className="flex border border-light rounded-full max-w-[40vw] ml-[6vw]">
            <Input placeholder="Search" type="text" className="border-none" value={val} onChange={(e) => setVal(e.target.value)} />
            <Button onClick={() => buttonAction && buttonAction(val)}>
                <Search className="active:none" />
            </Button>
        </div>)
}

export default Searchbar