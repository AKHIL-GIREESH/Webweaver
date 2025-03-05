import { useState } from "react"
import { card } from "./CardDragnDrop"

type Props = {
    index: number
    side: Number
    onDRag: (val: card) => void
}

const CardArea = ({index,side,onDRag}: Props) => {
  const [showArea, setShowArea] = useState(false)
  return (
    <div onDragEnter={() => setShowArea(true)} onDragLeave={() => setShowArea(false)} onDrop={() => {
        onDRag({index,side})
        setShowArea(false)
    }}
    onDragOver={e => e.preventDefault()} 
    style={showArea?{backgroundColor:"white",height:"50px",width:"50px",marginBottom:"10px",opacity:"50%"}:{opacity:0}}>🪝</div>
  )
}

export default CardArea