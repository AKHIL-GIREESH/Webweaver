//type Props = {}
import { EditorContainerType, EditorElementType } from "../../types/editor"
import Component from "./Component"
import Elem from "./Elem"
import { EditorContext } from '../../providers/editorProvider';
import { useContext } from 'react';


// const website:EditorContainerType = {
//   parent : "0",
//   id : "1",
//   styles : {border:"1px solid red",minHeight:"200px",width:"200px",height:"fit-content",resize:"both",overflow:"auto"},
//   kind:"Container",
//   contents : [{
//     parent:"1",
//     id:uuidv4(),
//     styles: {border:"1px solid"},
//     kind:"Elem",
//     contents: "works"
//   },{
//     parent:"1",
//     id:uuidv4(),
//     styles : {border:"1px solid",minHeight:"200px",width:"200px",height:"fit-content"},
//     kind:"Container",
//     contents:null
//   }]
// }

const Webplayground = () => {

  const editorContext = useContext(EditorContext)

  if (!editorContext) {
    throw new Error("Not initialised")
  }

  const { state: website } = editorContext

  console.log(website)

  if (!website) {
    throw new Error("Website empty")
  }

  const webBuilder = (prop: EditorContainerType | EditorElementType, index: number = 0) => {
    if (prop.kind == "Elem") {
      return (<Elem contents={prop.contents} styles={prop.styles} kind={prop.kind} parent={prop.parent} key={prop.id} id={prop.id} index={index} />)
    } else {
      return (<Component contents={prop.contents} styles={prop.styles} kind={prop.kind} recFunc={webBuilder} parent={prop.parent} key={prop.id} id={prop.id} index={index} />)
    }
  }

  return (
    <div style={{ width: "70vw", height: "100vh" }}>
      {
        webBuilder(website)
      }
    </div>

  )
}

export default Webplayground