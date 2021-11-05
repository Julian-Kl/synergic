import { Grid, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'

interface Props {
    components: 'molecules' | 'organisms'
}

export const AddComponent: React.FC<Props> = (props: Props) => {
    const [isActive, setIsActive] = useState(false)
    const [name, setName] = useState('')

    console.log(name)

    const createComponent = () => {
        if(name){
            fetchApi(
                `${builderApiUrl}/${props.components}`,
                'POST',
                {
                    name: name,
                }
            )
            setIsActive(false)
        }
    }

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
                                    createComponent()
                                }}
                            >
                                <CheckIcon fontSize='medium' />
                            </Button>
                            <Button variant='contained' color='error'>
                                <CloseIcon
                                    fontSize='medium'
                                    onClick={() => setIsActive(false)}
                                />
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
