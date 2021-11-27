import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import { atomMetadata } from '../../../../builder/types/atomMetadata'
import { CurrentEditedGridCellComponentContext } from '../../../contexts/CurrentEditedGridCellComponent'
import { ComponentData, ComponentGrid } from '../../../types/ComponentData'
import { ActiveItemSecondary, DefaultItemSecondary } from '../../atoms/ItemSecondary/ItemSecondary'
import { AtomPreview } from '../atomPreview/AtomPreview'

interface Props {
    component: ComponentData
    selectAble?: boolean
    selected?: boolean
    id?: number
}

export const MoleculePreview: React.FC<Props> = (props: Props) => {
    const currentEditedGridCellComponentContext = useContext(
        CurrentEditedGridCellComponentContext
    )

    const renderCellAtoms = (components: (ComponentData | atomMetadata)[]) => {
        return (
            <>
                {components.map((component, index) => {
                    if (component.type === 'atoms') {
                        return (
                            <AtomPreview
                                key={index}
                                component={component as atomMetadata}
                                selectAble={false}
                            />
                        )
                    }
                })}
            </>
        )
    }

    const renderGrid = (ComponentGrid: ComponentGrid[]) => {
        return (
            <Grid container spacing={2}>
                {ComponentGrid.map((grid, index) => (
                    <Grid  key={index} item xs={grid.size}>
                        {renderCellAtoms(grid.components)}
                    </Grid>
                ))}
            </Grid>
        )
    }

    const renderError = () => {
        return (
            <div style={{ color: 'red' }}>
                Molecule {props.component.name} is empty or misses grid
            </div>
        )
    }
    const selectMolecule = () => {
        if (props.id !== undefined) {
            currentEditedGridCellComponentContext?.setComponent(props.component)
            currentEditedGridCellComponentContext?.setId(props.id)
        }
    }

    const renderPreview = () => {
        if (props.component.grid.length > 1) {
            return renderGrid(props.component.grid)
        } else if (props.component.grid.length === 1) {
            if (props.component.grid[0].size === 12) {
                // Molecule has only one cell full width
                return renderCellAtoms(props.component.grid[0].components)
            } else {
                return renderError()
            }
        } else {
            return renderError()
        }
    
    }

    if (props.selectAble) {
        if (
            props.selected &&
            currentEditedGridCellComponentContext?.id === props.id &&
            currentEditedGridCellComponentContext?.component?.type === 'molecules'
        ) {
            return (
                <ActiveItemSecondary>
                    {renderPreview()}
                </ActiveItemSecondary>
            )
        } else {
            return (
                <DefaultItemSecondary onClick={() => selectMolecule()}>
                    {renderPreview()}
                </DefaultItemSecondary>
            )
        }
    } else {
        return <>{renderPreview()}</>
    }
}
