import React from 'react'
import { Box, Grid } from '@mui/material'
import { BuilderComponentList } from './BuilderComponentList/BuilderComponentList'
import { AtomList } from './AtomList/AtomList'
import { AddComponent } from '../../atoms/AddComponent/AddComponent'

interface Props {
    components: 'atoms' | 'molecules' | 'organisms'
}

export const ComponentList: React.FC<Props> = (props: Props) => {
    if (props.components === 'atoms') {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <AtomList />
                </Grid>
            </Box>
        )
    } else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <BuilderComponentList components={props.components} />
                    <AddComponent components={props.components} />
                </Grid>
            </Box>
        )
    }
}
