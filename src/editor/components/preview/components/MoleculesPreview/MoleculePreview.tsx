import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import { SelectedGridCellComponent } from '../../../../contexts/CompoundEditor/SelectedGridCellComponent'
import { Atom } from '../../../../types/Atom'
import { Compound, CompoundGrid } from '../../../../types/Compound'
import { ActiveItemSecondary, DefaultItemSecondary } from '../../../atoms/ItemSecondary/ItemSecondary'
import { AtomPreview } from '../AtomPreview/AtomPreview'

interface Props {
    component: Compound
    selectAble?: boolean
    selected?: boolean
    id?: number
}

export const MoleculePreview: React.FC<Props> = (props: Props) => {
    const selectedGridCellComponent = useContext(
        SelectedGridCellComponent
    )

    const renderCellAtoms = (components: (Compound | Atom)[]) => {
        return (
            <>
                {components.map((component, index) => {
                    if (component.type === 'atoms') {
                        return (
                            <AtomPreview
                                key={index}
                                component={component as Atom}
                                selectAble={false}
                            />
                        )
                    }
                })}
            </>
        )
    }

    const renderGrid = (CompoundGrid: CompoundGrid[]) => {
        return (
            <Grid container spacing={2}>
                {CompoundGrid.map((grid, index) => (
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
            selectedGridCellComponent?.setComponent(props.component)
            selectedGridCellComponent?.setId(props.id)
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
            selectedGridCellComponent?.id === props.id &&
            selectedGridCellComponent?.component?.type === 'molecules'
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
