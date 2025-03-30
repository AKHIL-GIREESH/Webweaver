import React, { createContext, useReducer, useState } from "react";
import { Action, EditorContainerType, editorContextType, EditorElementType, websiteContextData, websiteContextType } from "../types/editor";
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from "@tanstack/react-query";
import { getWebsite } from "@/api/getWebsite";
import { useLocation } from "react-router-dom";

export const EditorContext = createContext<editorContextType | null>(null)

export const WebsiteContext = createContext<websiteContextType | null>(null)

let website: EditorContainerType = {
    parent: "0",
    id: "1",
    styles: { border: "1px solid red", minHeight: "200px", width: "200px", height: "fit-content", resize: "both", overflow: "auto" },
    kind: "Container",
    contents: [{
        parent: "1",
        id: uuidv4(),
        styles: { border: "1px solid" },
        kind: "Elem",
        contents: "works"
    }, {
        parent: "1",
        id: uuidv4(),
        styles: { border: "1px solid", minHeight: "200px", width: "200px", height: "fit-content" },
        kind: "Container",
        contents: []
    }]
}

const findElemAndAdd = (container: EditorContainerType, parent: string, index: number, newContainer: EditorContainerType | EditorElementType): boolean => {
    if (container.id == parent) {
        if (Array.isArray(container.contents)) {
            container.contents.splice(index, 0, newContainer)
            return true
        }
    }

    if (Array.isArray(container.contents)) {
        for (const item of container.contents) {
            const found: boolean = findElemAndAdd(item as EditorContainerType, parent, index, newContainer);
            if (found) return found;
        }
    }

    return false
}

const findElemAndUpdate = (container: EditorContainerType, parent: string, index: string, style: React.CSSProperties): boolean => {
    if (container.id == index) {
        container.styles = style
        return true
    }

    if (Array.isArray(container.contents)) {
        for (const item of container.contents) {
            const found: boolean = findElemAndUpdate(item as EditorContainerType, parent, index, style);
            if (found) return found;
        }
    }

    return false
}

const reducer = (state: EditorContainerType, action: Action) => {
    switch (action.type) {
        case "setWebsite":
            return action.website;
        case "addElement": {
            const { parent, index, newContainer } = action
            if (!newContainer || typeof index !== "number" || !parent) {
                return state
            }
            const newState = JSON.parse(JSON.stringify(state));
            findElemAndAdd(newState, parent, index, newContainer)

            return newState;
        }
        case "updateStyle": {
            const { parent, index, style } = action
            if (!style || typeof index !== "string" || !parent) {
                return state
            }
            const newState = JSON.parse(JSON.stringify(state));
            findElemAndUpdate(newState, parent, index, style)

            return newState;
        }
        default:
            return state;
    }
}

const EditorProvider = ({ children }: React.PropsWithChildren) => {

    const id = useLocation().pathname.split("/")[2]

    const [rest, setRest] = useState<websiteContextData>({
        title: "",
        tags: [],
        kind: "website"
    })
    const [state, dispatch] = useReducer(reducer, website);

    const { data, isLoading, error } = useQuery({
        queryKey: ["getWebsite"],
        queryFn: async () => {
            const data = await getWebsite(id)
            const { code, title, tags } = data.Website
            if (data) {
                console.log(data)
                dispatch({
                    type: "setWebsite",
                    website: code ? code : website,
                });
                setRest({ ...rest, title: title, tags: tags ? tags : [] })
            }
            return data
        },
    });



    if (error) {
        console.log(error)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }



    if (data) return (
        <WebsiteContext.Provider value={{
            state: rest,
            update: setRest
        }}>
            <EditorContext.Provider value={{
                state: state,
                action: dispatch
            }}>
                {children}
            </EditorContext.Provider>
        </WebsiteContext.Provider>
    )
}

export default EditorProvider