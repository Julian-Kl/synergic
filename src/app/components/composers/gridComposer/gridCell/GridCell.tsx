import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Grid, Paper, styled } from '@mui/material'
import React from 'react'
import { ComponentGrid } from '../../../../types/ComponentData'
import { GridCellChildren } from './gridCellChildren/GridCellChildren'

export const DefaultItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    ':hover': {
        border: 'solid 1px rgba(25,118,210, .5)',
    },
    border: 'solid 1px rgba(25,118,210, .2)',
    borderRadius: 0,
}))

export const ActiveItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px rgba(25,118,210, 1)',
    borderRadius: 0,
}))

interface SettingsPopupProps {
    deleteGridElement: () => void
}

const SettingsPopup: React.FC<SettingsPopupProps> = (props: SettingsPopupProps) => {
    return (
        <Paper
            elevation={3}
            style={{
                position: 'absolute',
                border: 'solid 1px rgba(25,118,210, 1)',
                borderRadius: 4,
                padding: 4,
                backgroundColor: '#d5d5d5'
            }}
        >
            <Grid container>
                <Grid item xs={4} style={{ padding: 0 }}>
                    <Button
                        color='error'
                        variant='text'
                        onClick={() => props.deleteGridElement()}
                    >
                        <DeleteIcon fontSize='small' />
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

interface GridCellProps {
    selected?: boolean
    gridElement: ComponentGrid
    deleteGridElement: () => void
}

export const GridCell: React.FC<GridCellProps> = (props: GridCellProps) => {
    return props.selected && props.deleteGridElement ? (
        <ActiveItem>
            <GridCellChildren components={props.gridElement.components} />
            <SettingsPopup deleteGridElement={() => props.deleteGridElement()} />
        </ActiveItem>
    ) : (
        <DefaultItem>
            <GridCellChildren components={props.gridElement.components} />
        </DefaultItem>
    )
}
