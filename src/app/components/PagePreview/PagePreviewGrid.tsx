import { Grid } from '@mui/material'
import React from 'react'
import { PageAtomicCompound, PageCompoundGrid } from '../../types/Page'
import { PageAtomPreview } from './PagePreviewAtom'

interface GridElementProps {
    gridItem: PageCompoundGrid
    locator: (string | number)[]
}

const GridElement: React.FC<GridElementProps> = (props: GridElementProps) => {
    return (
        <Grid item xs={props.gridItem.size}>
            {props.gridItem.components.map((component, index) => {
                if ('grid' in component) {
                    // Component has grid
                    return <PagePreviewGrid key={index} component={component} locator={props.locator.concat(['components', index])} />
                } else if ('name' in component) {
                    // Component is atom
                    return (
                            <PageAtomPreview key={index} component={component} locator={props.locator.concat(['components', index])} />
                    )
                }
            })}
        </Grid>
    )
}

interface PagePreviewGridProps {
    component: PageAtomicCompound
    locator: (string | number)[]
}

export const PagePreviewGrid: React.FC<PagePreviewGridProps> = (
    props: PagePreviewGridProps
) => {

    return (
        <Grid container spacing={2}>
            {props.component.grid.map((gridItem, index) => (
                <GridElement
                    key={index}
                    gridItem={gridItem}
                    locator={props.locator.concat(['grid', index])}
                />
            ))}
        </Grid>
    )
}
