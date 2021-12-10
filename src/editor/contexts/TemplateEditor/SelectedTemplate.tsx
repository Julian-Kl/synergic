import React, { createContext, useMemo, useState } from 'react'
import { Template } from '../../types/Template'

interface SelectedTemplate {
    template: Template | null
    setTemplate: React.Dispatch<React.SetStateAction<Template | null>>
}

export const SelectedTemplate = createContext<SelectedTemplate | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedTemplateProvider: React.FC<Props> = (
    props: Props
) => {
    const [template, setTemplate] = useState<Template | null>(null)

    const value = useMemo(() => ({ template, setTemplate }), [
        template,
        setTemplate,
    ])

    return (
        <SelectedTemplate.Provider value={value}>
            {props.children}
        </SelectedTemplate.Provider>
    )
}
