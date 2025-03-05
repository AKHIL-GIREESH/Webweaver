import { useContext } from 'react'
import { EditorElementType } from '../../types/editor'
import TPlaceHolderArea from './TPlaceHolderArea'
import { WebBuilderSelectionContext } from '../../providers/webBuilderSelectionProvider'

const Elem = ({contents,styles,kind, parent , id,index} : EditorElementType & {index:number}) => {
  const selectedElem = useContext(WebBuilderSelectionContext)
  if (!selectedElem){
    throw new Error("Select Element Issue")
  }
  const {update} = selectedElem

  return (
    <>
      <input type="text" value={contents} style={styles} onClick={(e) => {
            e.stopPropagation()
            update({parent:parent,id:id})
          }}></input>
      <TPlaceHolderArea parent={parent} id={id} key={parent+id} index={index+1}/>
    </>
  )
}

export default Elem