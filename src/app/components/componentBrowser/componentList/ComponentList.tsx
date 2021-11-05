import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { BuilderComponentList } from './BuilderComponentList/BuilderComponentList'
import { AtomList } from './AtomList/AtomList'

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
                    <Grid item xs={2}>
                        <Button variant='contained' href='#contained-buttons'>
                            <AddCircleIcon fontSize='medium' />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
