import { useContext } from "react"
import { WebBuilderSelectionContext } from "../providers/webBuilderSelectionProvider"

const Treee = () => {

    const selectedElem = useContext(WebBuilderSelectionContext)
    if (!selectedElem){
        throw new Error("Treee issue")
    }

    const {item,update} = selectedElem

    return(
        <div style={{width:"10vw",border:"1px solid",height:"100vh"}}>
            {item?
            <div>
                {item.id}
            </div>
            :
            <p>Select an Element to edit</p>
            }
        </div>
    )
}

export default Treee