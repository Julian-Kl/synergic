import React, { createContext, useMemo, useState } from 'react'
import { Template } from '../types/Template'

interface CurrentEditedTemplateContextInterface {
    template: Template | null
    setTemplate: React.Dispatch<React.SetStateAction<Template | null>>
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
    const [template, setTemplate] = useState<Template | null>(null)

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
