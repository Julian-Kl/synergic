import React, { useState, useMemo } from 'react'
import {
    SelectedCellContextProvider,
    SelectedCellContext,
    SelectedCellInterace
} from './SelectedCellContext'

export const SelectedCellHelper: React.FC = (props) => {
    const [selectedCell, setSelectedCell] = useState<SelectedCellInterace | null>(null)

    const selectedCellMemo = useMemo(
        () => ({
            selectedCell,
            setSelectedCell
        }),
        [selectedCell]
    )

    return (
        <SelectedCellContextProvider value={SelectedCellContext}>
            {props.children}
        </SelectedCellContextProvider>
    )
}
