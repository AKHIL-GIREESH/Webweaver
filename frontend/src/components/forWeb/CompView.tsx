import { EditorContainerType, EditorElementType } from "@/types/editor";

type CompViewProps = EditorContainerType & {
    recFunc: (prop: EditorContainerType | EditorElementType, index: number) => JSX.Element;
}

const CompView: React.FC<CompViewProps> = ({ contents, styles, kind, recFunc, parent, id }) => {
    return (
        <>
            <div style={styles}>
                {contents?.map((item, index) => recFunc(item, index))}
            </div>
        </>
    );
}

export default CompView