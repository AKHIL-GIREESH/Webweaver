import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { EditorContainerType, EditorElementType } from '../../types/editor'
import TPlaceHolderArea from './TPlaceHolderArea';
import { WebBuilderSelectionContext } from '../../providers/webBuilderSelectionProvider';

type ComponentProps = {index:number} & EditorContainerType & {
  recFunc: (prop: EditorContainerType | EditorElementType,index:number) => JSX.Element;
};

const Component: React.FC<ComponentProps> = ({ contents, styles, kind, recFunc, parent , id, index}) => {
  
  const placeHolderArea = uuidv4()

  const selectedElem = useContext(WebBuilderSelectionContext)
  if (!selectedElem){
    throw new Error("Select Element Issue")
  }
  const {update} = selectedElem 

  return (
    <>
        <div style={styles} onClick={(e) => {
            e.stopPropagation()
            update({parent:parent,id:id})
          }}>
            <TPlaceHolderArea parent={id} id={placeHolderArea} key={id+placeHolderArea} index={0}/>
            {contents?.map((item,index) => recFunc(item,index))}
        </div>
        <TPlaceHolderArea parent={parent} id={id} key={parent+id} index={index+1}/>
    </>
  );
};

export default Component;
