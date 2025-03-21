import Searchbar from "@/components/Layout/SearchBar"
import { useState } from "react"

const Explore = () => {
    const [val, setVal] = useState("")

    return (
        <div className="min-w-[82vw] min-h-[95vh] m-5" >
            <p className="text-my-gold">EXPLORE</p>
            <br />
            <Searchbar val={val} setVal={setVal} />
        </div>
    )

}

export default Explore