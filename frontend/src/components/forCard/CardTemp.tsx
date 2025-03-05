import CardArea from "./CardArea"
import { card } from "./CardDragnDrop"

type Props = {
    index: number
    side: Number
    setCard: (val: card | null) => void
    onDRag: (val: card) => void
}

const CardTemp = ({index,side,setCard,onDRag}: Props) => {
  return (
    <>
        <div draggable style={{backgroundColor:"white",height:"50px",width:"50px",marginBottom:"10px",color:"black"}} onDragStart={() => setCard({index:index,side:side})} onDragEnd={() => setCard(null)}>{""+index}</div>
        <CardArea index={index} side={side} onDRag={onDRag}/>
    </>
  )
}

export default CardTemp