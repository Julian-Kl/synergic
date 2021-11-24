import React, { createContext, useMemo, useState } from 'react'
import { TemplateData } from '../types/TemplateData'

interface CurrentEditedTemplateContextInterface {
    template: TemplateData | null
    setTemplate: React.Dispatch<React.SetStateAction<TemplateData | null>>
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
    const [template, setTemplate] = useState<TemplateData | null>(null)

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
