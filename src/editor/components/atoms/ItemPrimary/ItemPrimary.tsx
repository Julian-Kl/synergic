import { Paper, styled } from '@mui/material'

export const DefaultItemPrimary = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    ':hover': {
        border: `solid 1px ${theme.palette.primary.light}`,
    },
    border: `solid 1px transparent`,
    borderRadius: 0,
}))

export const ActiveItemPrimary = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.primary.light}`,
    borderRadius: 0,
}))
