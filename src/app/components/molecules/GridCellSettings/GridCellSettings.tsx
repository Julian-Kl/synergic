import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Divider, GridSize, Slider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedGridCellComponentContext } from '../../../contexts/CurrentEditedGridCellComponent'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { ComponentData, ComponentGrid } from '../../../types/ComponentData'

export const GridCellSettings: React.FC = () => {
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const [gridElements, setGridElements] = useState<ComponentGrid[]>([])
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
        if (currentEditedGridCell && currentEditedGridCell.component) {
            const updatedCellComponent: ComponentGrid = Object.assign(
                {},
                currentEditedGridCell.component
            )
            updatedCellComponent.size = newValue as GridSize
            currentEditedGridCell.setComponent(updatedCellComponent)

            if (cellId != null) {
                const updatedCurrentEditedComponent: ComponentData = Object.assign(
                    {},
                    currentEditedComponent?.component
                )
                updatedCurrentEditedComponent.grid[cellId] =
                    currentEditedGridCell.component

                const response = await fetchApi(
                    `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
                    'PUT',
                    {
                        grid: updatedCurrentEditedComponent.grid,
                    }
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
        const updatedGrid = gridElements.filter(function (value, index, arr) {
            return index != currentEditedGridCell?.id
        })

        const response = await fetchApi(
            `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
            'PUT',
            {
                grid: updatedGrid,
            }
        )

        if (!response.loading) {
            const updatedCurrentEditedComponent: ComponentData = Object.assign(
                {},
                currentEditedComponent?.component
            )
            updatedCurrentEditedComponent.grid = updatedGrid
            currentEditedComponent?.setComponent(updatedCurrentEditedComponent)

            currentEditedGridCell?.setComponent(null)
            currentEditedGridCell?.setId(null)
            currentEditedGridCellComponent?.setComponent(null)
            currentEditedGridCellComponent?.setId(null)
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
