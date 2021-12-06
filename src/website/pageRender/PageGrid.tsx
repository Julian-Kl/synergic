import { Grid } from '@mui/material'
import React from 'react'
import { PageCompound, PageCompoundGrid } from '../../app/types/Page'
import { PageAtom } from './PageAtom'

interface GridElementProps {
    gridItem: PageCompoundGrid
}

const GridElement: React.FC<GridElementProps> = (props: GridElementProps) => {
    return (
        <Grid item xs={props.gridItem.size}>
            {props.gridItem.components.map((component, index) => {
                if ('grid' in component) {
                    // Component has grid
                    return <PageGrid key={index} component={component} />
                } else if ('name' in component) {
                    // Component is atom
                    return <PageAtom key={index} component={component} />
                }
            })}
        </Grid>
    )
}

interface PageGridProps {
    component: PageCompound
}

export const PageGrid: React.FC<PageGridProps> = (props: PageGridProps) => {
    return (
        <Grid container spacing={2}>
            {props.component.grid.map((gridItem, index) => (
                <GridElement key={index} gridItem={gridItem} />
            ))}
        </Grid>
    )
}
