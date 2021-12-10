import React, { createContext, useMemo, useState } from 'react'
import { CompoundGrid } from '../../types/Compound'

interface SelectedGridCell {
    gridCell: CompoundGrid | null
    setGridCell: React.Dispatch<React.SetStateAction<CompoundGrid | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const SelectedGridCell = createContext<SelectedGridCell | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedGridCellProvider: React.FC<Props> = (
    props: Props
) => {
    const [gridCell, setGridCell] = useState<CompoundGrid | null>(null)
    const [id, setId] = useState<number | null>(null)

    const value = useMemo(() => ({ gridCell, setGridCell, id, setId }), [
        gridCell,
        setGridCell,
        id,
        setId,
    ])

    return (
        <SelectedGridCell.Provider value={value}>
            {props.children}
        </SelectedGridCell.Provider>
    )
}
