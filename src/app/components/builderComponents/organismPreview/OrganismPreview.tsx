import { Grid } from '@mui/material'
import React from 'react'
import { atomMetadata } from '../../../types/atomMetadata'
import { ComponentData, ComponentGrid } from '../../../types/ComponentData'
import { AtomPreview } from '../atomPreview/AtomPreview'
import { MoleculePreview } from '../moleculesPreview/MoleculePreview'

interface Props {
    organism: ComponentData
}

export const OrganismPreview: React.FC<Props> = (props: Props) => {
    const renderGrid = (ComponentGrid: ComponentGrid[]) => {
        return (
            <Grid container spacing={2}>
                {ComponentGrid.map((grid, index) => (
                    <Grid key={index} item xs={grid.size}>
                        {grid.components.map((component, index) => {
                            if (component.type === 'atoms') {
                                return (
                                    <AtomPreview
                                        key={index}
                                        component={component as atomMetadata}
                                    />
                                )
                            }

                            if (component.type === 'molecules') {
                                return (
                                    <MoleculePreview
                                        key={index}
                                        component={component as ComponentData}
                                    />
                                )
                            }
                        })}
                    </Grid>
                ))}
            </Grid>
        )
    }

    const renderError = () => {
        return (
            <div style={{ color: 'red' }}>
                Organism {props.organism.name} is empty
            </div>
        )
    }

    if (props.organism.grid.length > 1) {
        return renderGrid(props.organism.grid)
    } else if (props.organism.grid.length === 1) {
        if (props.organism.grid[0].size === 12) {
            // Molecule has only one cell full width
            return (
                <>
                    {props.organism.grid[0].components.map(
                        (component, index) => {
                            if (component.type === 'atoms') {
                                return (
                                    <AtomPreview
                                        key={index}
                                        component={component as atomMetadata}
                                    />
                                )
                            }
                            if (component.type === 'molecules') {
                                return (
                                    <MoleculePreview
                                        key={index}
                                        component={component as ComponentData}
                                    />
                                )
                            }
                        }
                    )}
                </>
            )
        } else {
            // Molecule has only one cell not full width
            return <div>need grid</div>
        }
    } else {
        return renderError()
    }
}
