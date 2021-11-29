import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routeObject } from '../../router/routes'

interface Props {
    routes: routeObject[]
}

export const Navbar: React.FC<Props> = (props: Props) => {
    const location = useLocation()

    return (
        <Box sx={{ maxWidth: '100%', borderBottom: 2, borderColor: 'divider' }}>
            <Tabs
                value={location.pathname}
                variant='scrollable'
                scrollButtons='auto'
                aria-label='navbar'
            >
                {props.routes.map(({ path, name }) => (
                    <Tab
                        key={path}
                        label={name}
                        component={Link}
                        to={path}
                        value={path}
                    />
                ))}
            </Tabs>
        </Box>
    )
}
