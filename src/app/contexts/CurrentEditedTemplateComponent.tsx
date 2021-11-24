import React, { createContext, useMemo, useState } from 'react'
import { ComponentData } from '../types/ComponentData'

interface CurrentEditedTemplateComponentContextInterface {
    component: ComponentData | null
    setComponent: React.Dispatch<React.SetStateAction<ComponentData | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const CurrentEditedTemplateComponentContext = createContext<CurrentEditedTemplateComponentContextInterface | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedTemplateComponentContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [component, setComponent] = useState<ComponentData | null>(null)
    const [id, setId] = useState<number | null>(null)

    const value = useMemo(() => ({ component, setComponent, id, setId }), [
        component,
        setComponent,
        id,
        setId,
    ])

    return (
        <CurrentEditedTemplateComponentContext.Provider value={value}>
            {props.children}
        </CurrentEditedTemplateComponentContext.Provider>
    )
}
