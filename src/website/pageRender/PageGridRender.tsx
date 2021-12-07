import { Grid } from '@mui/material'
import React from 'react'
import { PageAtom, PageCompound, PageCompoundGrid } from '../../editor/types/Page'
import { PageAtomRender } from './PageAtomRender'

interface GridElementProps {
    gridItem: PageCompoundGrid
}

const GridElement: React.FC<GridElementProps> = (props: GridElementProps) => {
    return (
        <Grid item xs={props.gridItem.size}>
            {props.gridItem.components.map((component, index) => {
                if ('grid' in component) {
                    return <PageGridRender key={index} compound={component as PageCompound} />
                } else {
                    return <PageAtomRender key={index} atom={component as PageAtom} />
                }
            })}
        </Grid>
    )
}

interface PageGridProps {
    compound: PageCompound
}

export const PageGridRender: React.FC<PageGridProps> = (props: PageGridProps) => {
    return (
        <Grid container spacing={2}>
            {props.compound.grid.map((gridItem, index) => (
                <GridElement key={index} gridItem={gridItem} />
            ))}
        </Grid>
    )
}
