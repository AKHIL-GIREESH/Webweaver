import React from "react"

export type elementKind = 'Elem' | 'Container'

export type sideBarSelectionContext = {
    state: elementKind | null,
    update: (val: elementKind) => void
}

export type EditorElementType = {
    parent: string
    id: string
    styles: React.CSSProperties
    kind: "Elem"
    contents: string
}

export type EditorContainerType = {
    parent: string
    id: string
    styles: React.CSSProperties
    kind: "Container"
    contents: (EditorContainerType | EditorElementType)[] | null
}

export type Action = {
    type: "addElement" | "updateStyle"
    parent: string
    index: number | string
    newContainer?: EditorContainerType | EditorElementType
    style?: React.CSSProperties
}

export type editorContextType = {
    state: EditorContainerType | null,
    action: React.Dispatch<Action>
}

export type webBuilderSelection = {
    parent: string,
    id: string
}

export type webBuilderSelectionContext = {
    item: webBuilderSelection | null,
    update: (val: webBuilderSelection) => void
}

export type websiteContextData = {
    title: string
    tags: string[],
    kind: "website" | "component"
}

export type websiteContextType = {
    state: websiteContextData
    update: (val: websiteContextData) => void
}

export type websiteAPIType = websiteContextData & { website: EditorContainerType }

// | 'section'
// | 'contactForm'
// | 'paymentForm'
// | 'link'
// | '2Col'
// | 'video'
// | '__body'
// | 'image'
// | null
// | '3Col'

// export type DeviceTypes = "Desktop" | "Mobile" | "Tablet"

// export type EditorElement = {
//     id: string
//     styles: React.CSSProperties
//     name: string
//     type: EditorBtns
//     content: EditorElement[] | { href?: string; innerText?: string; src?: string }
// }

// export type Editor = {
//     // livemode: boolean
//     elements: EditorElement[]
//     selectedElement: EditorElement
//     device: DeviceTypes
//     previewMode: boolean
// }

// export type HistoryState = {
//     history: Editor[]
//     currentIndex: number
// }

// export type EditorState = {
//     editor: Editor
//     history: HistoryState
// }

