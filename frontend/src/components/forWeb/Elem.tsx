import { useContext, useState } from 'react'
import { EditorElementType } from '../../types/editor'
import TPlaceHolderArea from './TPlaceHolderArea'
import { WebBuilderSelectionContext } from '../../providers/webBuilderSelectionProvider'
import { EditorContext } from '@/providers/editorProvider'

const Elem = ({ contents, styles, kind, parent, id, index }: EditorElementType & { index: number }) => {

  // const [val, setVal] = useState<string>(contents)

  const editorContext = useContext(EditorContext)
  const selectedElem = useContext(WebBuilderSelectionContext)

  if (!selectedElem || !editorContext) {
    throw new Error("Select Element Issue")
  }

  const { action } = editorContext
  const { update } = selectedElem

  return (
    <>
      <input type="text" value={contents} onChange={(e) => {
        console.log(e.target.value)
        action({ type: "updateText", parent: parent, index: id, content: e.target.value })
      }} style={styles} onClick={(e) => {
        e.stopPropagation()
        update({ parent: parent, id: id })
      }}></input>
      <TPlaceHolderArea parent={parent} id={id} key={parent + id} index={index + 1} />
    </>
  )
}

export default Elem