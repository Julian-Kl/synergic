import { Grid } from '@mui/material'
import React from 'react'
import { atomMetadata } from '../../../../builder/types/atomMetadata'
import { ComponentData, ComponentGrid } from '../../../types/ComponentData'
import { AtomPreview } from '../atomPreview/AtomPreview'

interface Props {
    component: ComponentData
}

export const MoleculePreview: React.FC<Props> = (props: Props) => {
    const renderCellAtoms = (components: (ComponentData | atomMetadata)[]) => {
        return (
            <>
                {components.map((component, index) => {
                    if (component.type === 'atoms') {
                        return (
                            <AtomPreview
                                key={index}
                                component={component as atomMetadata}
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
                Organism {props.component.name} is empty
            </div>
        )
    }

    if (props.component.grid.length > 1) {
        return renderGrid(props.component.grid)
    } else if (props.component.grid.length === 1) {
        if (props.component.grid[0].size === 12) {
            // Molecule has only one cell full width
            return renderCellAtoms(props.component.grid[0].components)
        } else {
            // Molecule has only one cell not full width
            return <div>need grid</div>
        }
    } else {
        return renderError()
    }
}
