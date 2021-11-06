import { GridSize, Paper, styled } from '@mui/material'
import React from 'react'

export const DefaultItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px rgba(25,118,210, 1)',
    borderRadius: 0,
}))


interface Props {
    size: GridSize | undefined
    selected?: boolean
}

export const GridCell: React.FC<Props> = (props: Props) => {
    return props.selected ? (
        <ActiveItem>xs={props.size}</ActiveItem>
    ) : (
        <DefaultItem>xs={props.size}</DefaultItem>
    )
}
