import React, { createContext, useMemo, useState } from 'react'
import { AtomicCompound } from '../types/AtomicCompound'
import { AtomProps } from '../types/AtomProps'

interface CurrentEditedGridCellComponentContext {
    component: AtomProps | AtomicCompound | null
    setComponent: React.Dispatch<React.SetStateAction<AtomProps | AtomicCompound | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const CurrentEditedGridCellComponentContext = createContext<CurrentEditedGridCellComponentContext | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedGridCellComponentContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [component, setComponent] = useState<AtomProps | AtomicCompound | null>(null)
    const [id, setId] = useState<number| null>(null)

    const value = useMemo(() => ({ component, setComponent, id, setId }), [
        component,
        setComponent,
        id,
        setId,
    ])

    return (
        <CurrentEditedGridCellComponentContext.Provider value={value}>
            {props.children}
        </CurrentEditedGridCellComponentContext.Provider>
    )
}
