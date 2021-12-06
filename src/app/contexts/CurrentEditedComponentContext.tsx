import React, { createContext, useMemo, useState } from 'react'
import { Compound } from '../types/Compound'

interface CurrentEditedComponentContextInterface {
    component: Compound | null
    setComponent: React.Dispatch<React.SetStateAction<Compound | null>>
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
    const [component, setComponent] = useState<Compound | null>(null)

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
