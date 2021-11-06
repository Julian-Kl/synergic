import React, { createContext, useMemo, useState } from 'react'
import { ComponentData } from '../types/ComponentData'

interface CurrentEditedComponentContextInterface {
    component: ComponentData | null
    setComponent: React.Dispatch<React.SetStateAction<ComponentData | null>>
}

export const CurrentEditedComponentContext = createContext<CurrentEditedComponentContextInterface | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedComponentContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [component, setComponent] = useState<ComponentData | null>(null)

    const value = useMemo(() => ({ component, setComponent }), [
        component,
        setComponent,
    ])

    return (
        <CurrentEditedComponentContext.Provider value={value}>
            {props.children}
        </CurrentEditedComponentContext.Provider>
    )
}
