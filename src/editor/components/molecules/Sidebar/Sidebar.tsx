import { Paper, styled } from '@mui/material'

export const SidebarLeft = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    boxShadow: 'none',
    borderRight: `solid 2px ${theme.palette.primary.main}`,
    borderRadius: 0,
    minHeight: '100%',
    padding: 24,
}))

export const SidebarRight = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    boxShadow: 'none',
    borderLeft: `solid 2px ${theme.palette.primary.main}`,
    borderRadius: 0,
    minHeight: '100%',
    padding: 24,
}))
