import CheckIcon from '@mui/icons-material/Check'
import { Button, Grid, Paper } from '@mui/material'
import React from 'react'

interface SettingsPopupProps {
    saveCanges: () => void
}

export const SettingsPopup: React.FC<SettingsPopupProps> = (props: SettingsPopupProps) => {
    return (
        <Paper
            elevation={3}
            style={{
                position: 'absolute',
                border: 'solid 1px rgba(25,118,210, 1)',
                borderRadius: 2,
                padding: 4,
            }}
        >
            <Grid container>
                <Grid item xs={4} style={{ padding: 0 }}>
                    <Button
                        color='error'
                        variant='text'
                        onClick={() => props.saveCanges()}
                    >
                        <CheckIcon fontSize='small' />
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}