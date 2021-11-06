import { Divider, GridSize, Slider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { ComponentGrid } from '../../../types/ComponentData'

export const SidebarLeftSettings: React.FC = () => {
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const gridContainerDenominator = 12
    
    const updateGridSize = (newValue: GridSize) => {
        if (
            currentEditedGridCell &&
            currentEditedGridCell.component
        ) {
            const updatedCellComponent: ComponentGrid = Object.assign({}, currentEditedGridCell.component);
            updatedCellComponent.size = newValue as GridSize
            currentEditedGridCell.setComponent(updatedCellComponent)
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
                        ) => updateGridSize(newValue as GridSize)}
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
