import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Divider, GridSize, Slider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedGridCellComponentContext } from '../../../contexts/CurrentEditedGridCellComponent'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { Compound, CompoundGrid } from '../../../types/Compound'

export const GridCellSettings: React.FC = () => {
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const [gridElements, setGridElements] = useState<CompoundGrid[]>([])
    const currentEditedGridCellComponent = useContext(
        CurrentEditedGridCellComponentContext
    )
    const gridContainerDenominator = 12

    useEffect(() => {
        if (typeof currentEditedComponent?.component?.grid != 'undefined') {
            setGridElements(currentEditedComponent?.component?.grid)
        }
    })

    const updateGridSize = async (
        newValue: GridSize,
        cellId: number | null
    ) => {
        if (
            currentEditedGridCell &&
            currentEditedGridCell.component &&
            currentEditedComponent?.component
        ) {
            const updatedCellComponent: CompoundGrid = Object.assign(
                {},
                currentEditedGridCell.component
            )
            updatedCellComponent.size = newValue as GridSize
            currentEditedGridCell.setComponent(updatedCellComponent)

            if (cellId != null) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    currentEditedComponent?.component
                )
                updatedCurrentEditedComponent.grid[cellId] =
                    currentEditedGridCell.component

                const response = await updateCompoundGrid(
                    currentEditedComponent?.component?.id,
                    currentEditedComponent?.component?.type,
                    updatedCurrentEditedComponent.grid
                )

                if (!response.loading) {
                    currentEditedComponent?.setComponent(
                        updatedCurrentEditedComponent
                    )
                }
            }
        }
    }

    const deleteGridElement = async () => {
        if (currentEditedComponent?.component) {
            const updatedGrid = gridElements.filter(function (
                value,
                index,
                arr
            ) {
                return index != currentEditedGridCell?.id
            })

            const response = await updateCompoundGrid(
                currentEditedComponent?.component?.id,
                currentEditedComponent?.component?.type,
                updatedGrid
            )

            if (!response.loading) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    currentEditedComponent?.component
                )
                updatedCurrentEditedComponent.grid = updatedGrid
                currentEditedComponent?.setComponent(
                    updatedCurrentEditedComponent
                )

                currentEditedGridCell?.setComponent(null)
                currentEditedGridCell?.setId(null)
                currentEditedGridCellComponent?.setComponent(null)
                currentEditedGridCellComponent?.setId(null)
            }
        }
    }

    return (
        <>
            {currentEditedGridCell?.component?.size && (
                <>
                    <Typography variant='h6' component='h3'>
                        Cell Settings
                    </Typography>
                    <Divider />
                    <Typography variant='body1' component='p'>
                        GridSize
                    </Typography>
                    <Slider
                        value={currentEditedGridCell?.component?.size as number}
                        onChange={(event: Event, newValue: number | number[]) =>
                            updateGridSize(
                                newValue as GridSize,
                                currentEditedGridCell?.id
                            )
                        }
                        step={1}
                        marks
                        min={1}
                        max={gridContainerDenominator}
                    />
                    <Divider />
                    <Button
                        variant='contained'
                        color='error'
                        endIcon={<DeleteIcon />}
                        onClick={() => deleteGridElement()}
                    >
                        Delete Cell
                    </Button>
                </>
            )}
        </>
    )
}
