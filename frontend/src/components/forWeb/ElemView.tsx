import { EditorElementType } from "@/types/editor"

const ElemView = ({ contents, styles, kind, parent, id }: EditorElementType) => {
    return (
        <>
            <input type="text" value={contents} style={styles} ></input>
        </>
    )
}

export default ElemView