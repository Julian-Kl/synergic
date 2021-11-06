import React, { createContext, useMemo, useState } from 'react'
import { ComponentGrid } from '../types/ComponentData'

interface CurrentEditedGridCellContextInterface {
    component: ComponentGrid | null
    setComponent: React.Dispatch<React.SetStateAction<ComponentGrid | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const CurrentEditedGridCellContext = createContext<CurrentEditedGridCellContextInterface | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedGridCellContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [component, setComponent] = useState<ComponentGrid | null>(null)
    const [id, setId] = useState<number | null>(null)

    const value = useMemo(() => ({ component, setComponent, id, setId }), [
        component,
        setComponent,
        id,
        setId,
    ])

    return (
        <CurrentEditedGridCellContext.Provider value={value}>
            {props.children}
        </CurrentEditedGridCellContext.Provider>
    )
}
