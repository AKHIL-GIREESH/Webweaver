import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditorButtonType, EditorContainerType, EditorElementType } from '../../types/editor';
import TPlaceHolderArea from './TPlaceHolderArea';
import { WebBuilderSelectionContext } from '../../providers/webBuilderSelectionProvider';
import ResizableBox from './resizeable';
import { EditorContext } from '../../providers/editorProvider'; // Import EditorContext

type ComponentProps = { index: number } & EditorContainerType & {
  recFunc: (prop: EditorContainerType | EditorElementType | EditorButtonType, index: number) => JSX.Element;
};

const Component: React.FC<ComponentProps> = ({ contents, styles, kind, recFunc, parent, id, index }) => {
  const placeHolderArea = uuidv4();
  const selectedElem = useContext(WebBuilderSelectionContext);
  const editor = useContext(EditorContext); // Get the editor context

  if (!selectedElem || !editor) {
    throw new Error('Context not available');
  }

  const { update: updateSelection } = selectedElem;
  const { action: dispatch } = editor; // Get the dispatch function from EditorContext

  // The onResize function will be called by ResizableBox
  const handleResize = (newDimensions: { width: number; height: number }) => {
    // Dispatch the updateStyle action to the editor's reducer
    dispatch({
      type: 'updateStyle',
      index: id,
      style: {
        width: newDimensions.width,
        height: newDimensions.height,
      },
    });
  };

  return (
    <>
      <ResizableBox
        style={styles}
        onClick={(e) => {
          e.stopPropagation();
          // Use the correct update function for selection
          updateSelection({ parent: parent, id: id });
        }}
        onResize={handleResize} // Pass the handler
      >
        <TPlaceHolderArea parent={id} id={placeHolderArea} key={id + placeHolderArea} index={0} />
        {contents?.map((item, idx) => recFunc(item, idx))}
      </ResizableBox>
      <TPlaceHolderArea parent={parent} id={id} key={parent + id} index={index + 1} />
    </>
  );
};

export default Component;