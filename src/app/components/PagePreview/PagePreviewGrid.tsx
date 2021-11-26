import { Grid } from '@mui/material'
import React from 'react'
import {
    StructureComponentData,
    structureComponentGrid
} from '../../types/PageData'
import { PageAtomPreview } from './PagePreviewAtom'

interface GridElementProps {
    gridItem: structureComponentGrid
}

const GridElement: React.FC<GridElementProps> = (props: GridElementProps) => {
    return (
        <Grid item xs={props.gridItem.size}>
            {props.gridItem.components.map((component, index) => {
                if ('grid' in component) {
                    // Component has grid
                    return <PagePreviewGrid key={index} component={component}/>
                } else if ('name' in component) {
                    // Component is atom
                    return <PageAtomPreview key={index} component={component}/>
                }
            })}
        </Grid>
    )
}

interface PagePreviewGridProps {
    component: StructureComponentData
}

export const PagePreviewGrid: React.FC<PagePreviewGridProps> = (
    props: PagePreviewGridProps
) => {
    return (
        <Grid container spacing={2}>
            {props.component.grid.map((gridItem, index) => (
                <GridElement key={index} gridItem={gridItem} />
            ))}
        </Grid>
    )
}
