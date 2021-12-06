import { Grid } from '@mui/material'
import React from 'react'
import { Atom } from '../../../types/Atom'
import { AtomicCompound, CompoundGrid } from '../../../types/AtomicCompound'
import { AtomPreview } from '../atomPreview/AtomPreview'
import { MoleculePreview } from '../moleculesPreview/MoleculePreview'

interface Props {
    organism: AtomicCompound
}

export const OrganismPreview: React.FC<Props> = (props: Props) => {
    const renderGrid = (CompoundGrid: CompoundGrid[]) => {
        return (
            <Grid container spacing={2}>
                {CompoundGrid.map((grid, index) => (
                    <Grid key={index} item xs={grid.size}>
                        {grid.components.map((component, index) => {
                            if (component.type === 'atoms') {
                                return (
                                    <AtomPreview
                                        key={index}
                                        component={component as Atom}
                                    />
                                )
                            }

                            if (component.type === 'molecules') {
                                return (
                                    <MoleculePreview
                                        key={index}
                                        component={component as AtomicCompound}
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
                                        component={component as Atom}
                                    />
                                )
                            }
                            if (component.type === 'molecules') {
                                return (
                                    <MoleculePreview
                                        key={index}
                                        component={component as AtomicCompound}
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
