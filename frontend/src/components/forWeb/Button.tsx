import React, { useContext } from 'react';
import { EditorButtonType } from '../../types/editor';
import { WebBuilderSelectionContext } from '../../providers/webBuilderSelectionProvider';
import ResizableBox from './resizeable';
import { EditorContext } from '../../providers/editorProvider';

type ButtonProps = { index: number } & EditorButtonType & {
    recFunc: (prop: EditorButtonType, index: number) => JSX.Element;
};

const Button: React.FC<ButtonProps> = ({ contents, styles, kind, parent, id, index, url }) => {
    const selectedElem = useContext(WebBuilderSelectionContext);
    const editor = useContext(EditorContext);

    if (!selectedElem || !editor) {
        throw new Error('Context not available');
    }

    const { update: updateSelection } = selectedElem;
    const { action: dispatch } = editor;

    const handleResize = (newDimensions: { width: number; height: number }) => {
        dispatch({
            type: 'updateStyle',
            index: id,
            style: {
                width: newDimensions.width,
                height: newDimensions.height,
            },
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateSelection({ parent: parent, id: id });
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <ResizableBox
                style={styles}
                onClick={handleClick}
                onResize={handleResize}
            >
                <button
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        color: 'inherit',
                        ...styles
                    }}
                    onClick={handleButtonClick}
                >
                    {contents}
                </button>
            </ResizableBox>
        </>
    );
};

export default Button;
