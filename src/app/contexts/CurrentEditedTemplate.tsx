import React, { createContext, useMemo, useState } from 'react'
import { ComponentData } from '../types/ComponentData'

interface CurrentEditedTemplateContextInterface {
    template: ComponentData | null
    setTemplate: React.Dispatch<React.SetStateAction<ComponentData | null>>
}

export const CurrentEditedTemplateContext = createContext<CurrentEditedTemplateContextInterface | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedTemplateContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [template, setTemplate] = useState<ComponentData | null>(null)

    const value = useMemo(() => ({ template, setTemplate }), [
        template,
        setTemplate,
    ])

    return (
        <CurrentEditedTemplateContext.Provider value={value}>
            {props.children}
        </CurrentEditedTemplateContext.Provider>
    )
}
