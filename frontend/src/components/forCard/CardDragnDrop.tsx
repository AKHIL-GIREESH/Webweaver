import { useContext, useState } from "react"
import { EditorContext } from "../../providers/editorProvider"
import CardTemp from "./CardTemp"

export type card = {
    index: number
    side: Number
}

const CardDragnDrop = () => {
    const editorState = useContext(EditorContext)
    console.log(editorState?.state)


    const [card, setCard] = useState<null | card>(null)
    const [cards,setCards] = useState<card[]>([{index:1,side:1},{index:2,side:1},{index:3,side:1},{index:4,side:2},{index:5,side:2},{index:6,side:2}])

    const onDRag = ({index,side}:card) => {
        console.log(index,side)
        if(card){
            const newCards = cards.filter(({index,side}) => index !== card.index)
            newCards.splice(index,0,{
                ...card,
                side:side
            })

            setCards(newCards)
        }
        

    }

    return(
        <div style={{width:"80vw",height:"100vh"}}>
            <div style={{display:"flex",border:"1px solid",width:"70vw",marginLeft:"5vw",height:"80vh"}}>
                <div style={{border:"1px solid",width:"50%",height:"100%"}}>
                    {cards?.map(({index,side}) => side === 1 && <CardTemp key={""+index} index={index} side={side} setCard={setCard} onDRag={onDRag}/>)}
                </div>
                <div>
                    {cards?.map(({index,side}) => side === 2 && <CardTemp key={""+index} index={index} side={side} setCard={setCard} onDRag={onDRag}/>)}
                </div>
            </div>
        </div>
    )
}

export default CardDragnDrop