import { Button, Grid, GridSize, Paper, styled } from '@mui/material'
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove'

interface Props {
    size: GridSize
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    ":hover": {
        border: 'solid 1px rgba(25,118,210, .5)'
    },
    border: 'solid 1px rgba(25,118,210, .2)',
    borderRadius: 0,
}))

export const GridCell: React.FC<Props> = (props: Props) => {
    return (
        <Grid item xs={props.size}>
            <Item>xs={props.size}</Item>
        </Grid>
    )
}
