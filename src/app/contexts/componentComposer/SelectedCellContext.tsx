import { GridSize } from '@mui/material'
import { createContext } from 'react'

export interface SelectedCellInterace {
    index: number
    gridSize: GridSize
}

export const SelectedCellContext = createContext<SelectedCellInterace | null>(null)

export const SelectedCellContextProvider = SelectedCellContext.Provider

export const SelectedCellContextConsumer = SelectedCellContext.Consumer
