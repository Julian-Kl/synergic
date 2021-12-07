import { Paper, styled } from '@mui/material'

export const DefaultItemSecondary = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    ':hover': {
        border: `solid 1px ${theme.palette.secondary.light}`,
    },
    border: `solid 1px transparent`,
    borderRadius: 0,
}))

export const ActiveItemSecondary = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.secondary.light}`,
    borderRadius: 0,
}))
