import { useContext } from "react"
import { WebBuilderSelectionContext } from "../providers/webBuilderSelectionProvider"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const Treee = () => {

    const selectedElem = useContext(WebBuilderSelectionContext)
    if (!selectedElem){
        throw new Error("Treee issue")
    }

    const {item,update} = selectedElem

    return(
        <div className="w-[10vw] h-[100vh] border">
            {item?
            <div className="mt-[10vh]">
                <Slider defaultValue={[10]} max={100} step={1} />
            </div>
            :
            <p>Select an Element to edit</p>
            }
        </div>
    )
}

export default Treee