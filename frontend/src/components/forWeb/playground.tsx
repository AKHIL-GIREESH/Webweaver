// import CardDragnDrop from "./CardDragnDrop"

//Entry Point of the Builder

import ImageWeb from "./ImageWeb"
import Webplayground from "./webplayground"

const Playground = () => {
    return (
        <div className="flex flex-col justify-between">
            <Webplayground />
            <ImageWeb />
        </div>


        // <CardDragnDrop/>
    )
}

export default Playground