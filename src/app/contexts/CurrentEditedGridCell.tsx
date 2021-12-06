import React, { createContext, useMemo, useState } from 'react'
import { CompoundGrid } from '../types/AtomicCompound'

interface CurrentEditedGridCellContextInterface {
    component: CompoundGrid | null
    setComponent: React.Dispatch<React.SetStateAction<CompoundGrid | null>>
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
    const [component, setComponent] = useState<CompoundGrid | null>(null)
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
