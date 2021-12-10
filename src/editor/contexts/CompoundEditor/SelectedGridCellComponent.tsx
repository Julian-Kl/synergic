import React, { createContext, useMemo, useState } from 'react'
import { Atom } from '../../types/Atom'
import { Compound } from '../../types/Compound'

interface SelectedGridCellComponent {
    component: Atom | Compound | null
    setComponent: React.Dispatch<React.SetStateAction<Atom | Compound | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const SelectedGridCellComponent = createContext<SelectedGridCellComponent | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedGridCellComponentProvider: React.FC<Props> = (
    props: Props
) => {
    const [component, setComponent] = useState<Atom | Compound | null>(null)
    const [id, setId] = useState<number| null>(null)

    const value = useMemo(() => ({ component, setComponent, id, setId }), [
        component,
        setComponent,
        id,
        setId,
    ])

    return (
        <SelectedGridCellComponent.Provider value={value}>
            {props.children}
        </SelectedGridCellComponent.Provider>
    )
}
