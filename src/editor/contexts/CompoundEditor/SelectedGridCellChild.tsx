import React, { createContext, useMemo, useState } from 'react'
import { Atom } from '../../types/Atom'
import { Compound } from '../../types/Compound'

interface SelectedGridCellChild {
    child: Atom | Compound | null
    setChild: React.Dispatch<React.SetStateAction<Atom | Compound | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const SelectedGridCellChild = createContext<SelectedGridCellChild | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedGridCellChildProvider: React.FC<Props> = (
    props: Props
) => {
    const [child, setChild] = useState<Atom | Compound | null>(null)
    const [id, setId] = useState<number| null>(null)

    const value = useMemo(() => ({ child, setChild, id, setId }), [
        child,
        setChild,
        id,
        setId,
    ])

    return (
        <SelectedGridCellChild.Provider value={value}>
            {props.children}
        </SelectedGridCellChild.Provider>
    )
}
