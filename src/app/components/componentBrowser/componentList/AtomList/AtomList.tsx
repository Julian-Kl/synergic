import { Grid } from '@mui/material'
import { atomRegistry } from '../../../../../builder/components/atoms/atomRegistry'
import React from 'react'
import { Item } from '../Item/Item'

export const AtomList: React.FC = () => {
    return (
        <>
            {atomRegistry.map((component) => (
                <Grid key={component.name} item xs={2}>
                    <Item>{component.name}</Item>
                </Grid>
            ))}
        </>
    )
}
