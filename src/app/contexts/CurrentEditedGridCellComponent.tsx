import React, { createContext, useMemo, useState } from 'react'
import { atomProps } from '../types/atomProps'
import { ComponentData } from '../types/ComponentData'

interface CurrentEditedGridCellComponentContext {
    component: atomProps | ComponentData | null
    setComponent: React.Dispatch<React.SetStateAction<atomProps | ComponentData | null>>
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
    const [component, setComponent] = useState<atomProps | ComponentData | null>(null)
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
