import React, { createContext, useMemo, useState } from 'react'
import { AtomProps } from '../types/AtomProps'
import { ComponentData } from '../types/ComponentData'

interface CurrentEditedGridCellComponentContext {
    component: AtomProps | ComponentData | null
    setComponent: React.Dispatch<React.SetStateAction<AtomProps | ComponentData | null>>
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
    const [component, setComponent] = useState<AtomProps | ComponentData | null>(null)
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
