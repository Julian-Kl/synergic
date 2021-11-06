import { Grid, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    components: 'molecules' | 'organisms'
    createComponent: (name: string) => void
}

export const AddComponent: React.FC<Props> = (props: Props) => {
    const [isActive, setIsActive] = useState(false)
    const [name, setName] = useState('')

    if (isActive) {
        return (
            <Grid
                item
                xs='auto'
                style={{
                    paddingBottom: 16,
                    paddingRight: 16,
                    backgroundColor: 'lightGray',
                    borderRadius: 4,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs='auto'>
                            <TextField
                                id='outlined-basic'
                                label='Name'
                                variant='outlined'
                                size='small'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs='auto'>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={() => {
                                    props.createComponent(name)
                                    setIsActive(false)
                                }}
                            >
                                <CheckIcon fontSize='medium' />
                            </Button>
                            <Button
                                variant='contained'
                                color='error'
                                onClick={() => setIsActive(false)}
                            >
                                <CloseIcon fontSize='medium' />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        )
    } else {
        return (
            <Grid item xs={3}>
                <Button
                    variant='contained'
                    onClick={() => {
                        setIsActive(true)
                    }}
                >
                    <AddCircleIcon fontSize='medium' />
                </Button>
            </Grid>
        )
    }
}
