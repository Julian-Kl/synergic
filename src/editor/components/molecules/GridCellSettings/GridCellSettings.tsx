import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Divider, GridSize, Slider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedCompound } from '../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedGridCellChild } from '../../../contexts/CompoundEditor/SelectedGridCellChild'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { Compound, CompoundGrid } from '../../../types/Compound'

export const GridCellSettings: React.FC = () => {
    const selectedGridCell = useContext(SelectedGridCell)
    const selectedCompound = useContext(SelectedCompound)
    const [gridElements, setGridElements] = useState<CompoundGrid[]>([])
    const selectedGridCellChild = useContext(
        SelectedGridCellChild
    )
    const gridContainerDenominator = 12

    useEffect(() => {
        if (typeof selectedCompound?.compound?.grid != 'undefined') {
            setGridElements(selectedCompound?.compound?.grid)
        }
    })

    const updateGridSize = async (
        newValue: GridSize,
        cellId: number | null
    ) => {
        if (
            selectedGridCell?.gridCell &&
            selectedCompound?.compound
        ) {
            const updatedCellComponent: CompoundGrid = Object.assign(
                {},
                selectedGridCell.gridCell
            )
            updatedCellComponent.size = newValue as GridSize
            selectedGridCell.setGridCell(updatedCellComponent)

            if (cellId != null) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    selectedCompound?.compound
                )
                updatedCurrentEditedComponent.grid[cellId] =
                    selectedGridCell.gridCell

                const response = await updateCompoundGrid(
                    selectedCompound?.compound?.id,
                    selectedCompound?.compound?.type,
                    updatedCurrentEditedComponent.grid
                )

                if (!response.loading) {
                    selectedCompound?.setCompound(
                        updatedCurrentEditedComponent
                    )
                }
            }
        }
    }

    const deleteGridElement = async () => {
        if (selectedCompound?.compound) {
            const updatedGrid = gridElements.filter(function (
                value,
                index,
                arr
            ) {
                return index != selectedGridCell?.id
            })

            const response = await updateCompoundGrid(
                selectedCompound?.compound?.id,
                selectedCompound?.compound?.type,
                updatedGrid
            )

            if (!response.loading) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    selectedCompound?.compound
                )
                updatedCurrentEditedComponent.grid = updatedGrid
                selectedCompound?.setCompound(
                    updatedCurrentEditedComponent
                )

                selectedGridCell?.setGridCell(null)
                selectedGridCell?.setId(null)
                selectedGridCellChild?.setChild(null)
                selectedGridCellChild?.setId(null)
            }
        }
    }

    return (
        <>
            {selectedGridCell?.gridCell?.size && (
                <>
                    <Typography variant='h6' component='h3'>
                        Cell Settings
                    </Typography>
                    <Divider />
                    <Typography variant='body1' component='p'>
                        GridSize
                    </Typography>
                    <Slider
                        value={selectedGridCell?.gridCell?.size as number}
                        onChange={(event: Event, newValue: number | number[]) =>
                            updateGridSize(
                                newValue as GridSize,
                                selectedGridCell?.id
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
