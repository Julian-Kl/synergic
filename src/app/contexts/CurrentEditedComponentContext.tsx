import React, { createContext, useMemo, useState } from 'react'
import { AtomicCompound } from '../types/AtomicCompound'

interface CurrentEditedComponentContextInterface {
    component: AtomicCompound | null
    setComponent: React.Dispatch<React.SetStateAction<AtomicCompound | null>>
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
    const [component, setComponent] = useState<AtomicCompound | null>(null)

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
