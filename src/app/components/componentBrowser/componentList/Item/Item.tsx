import React from 'react'
import { Paper, styled } from '@mui/material'

export const DefaultItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.primary.main}`,
    ':hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        cursor: 'pointer',
    },
}))

export const ActiveItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
}))

interface Props {
    children: string
    selected?: boolean
}

export const Item: React.FC<Props> = (props: Props) => {
    return props.selected ? (
        <ActiveItem>{props.children}</ActiveItem>
    ) : (
        <DefaultItem>{props.children}</DefaultItem>
    )
}
