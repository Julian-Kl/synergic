import { Grid } from '@mui/material'
import React from 'react'
import { Atom } from '../../../../types/Atom'
import { Compound, CompoundGrid } from '../../../../types/Compound'
import { AtomPreview } from '../AtomPreview/AtomPreview'
import { MoleculePreview } from '../MoleculesPreview/MoleculePreview'

interface Props {
    organism: Compound
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
                                        component={component as Compound}
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
                                        component={component as Compound}
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
