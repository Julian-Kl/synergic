import { Divider, GridSize, Slider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { ComponentData, ComponentGrid } from '../../../types/ComponentData'

export const SidebarLeftSettings: React.FC = () => {
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const gridContainerDenominator = 12
    
    const updateGridSize = async (newValue: GridSize, cellId: number | null) => {
        if (
            currentEditedGridCell &&
            currentEditedGridCell.component
        ) {
            const updatedCellComponent: ComponentGrid = Object.assign({}, currentEditedGridCell.component)
            updatedCellComponent.size = newValue as GridSize
            currentEditedGridCell.setComponent(updatedCellComponent)

            if(cellId) {
                const updatedCurrentEditedComponent: ComponentData = Object.assign({}, currentEditedComponent?.component)
                updatedCurrentEditedComponent.grid[cellId] = currentEditedGridCell.component
                

                const response = await fetchApi(
                    `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
                    'PUT',
                    {
                        grid: updatedCurrentEditedComponent.grid,
                    }
                )
        
                if (!response.loading) {
                    currentEditedComponent?.setComponent(updatedCurrentEditedComponent)
                }
            }
        }
    }

    return (
        <>
            <Typography variant='h6' component='h3'>
                Cell Settings
            </Typography>
            <Divider />
            {currentEditedGridCell?.component?.size  && (
                <>
                    <Typography variant='h6' component='p'>
                        GridSize
                    </Typography>
         
                    <Slider
                        value={currentEditedGridCell?.component?.size as number}
                        onChange={(
                            event: Event,
                            newValue: number | number[]
                        ) => updateGridSize(newValue as GridSize, currentEditedGridCell?.id)}
                        step={1}
                        marks
                        min={1}
                        max={gridContainerDenominator}
                    />
                </>
            )}
            <Divider />
        </>
    )
}
