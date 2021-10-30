import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { routeObject } from '../../router/routes'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    routes: routeObject[]
}

export const Navbar: React.FC<Props> = (props: Props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth ? window.innerWidth : '100%')

    const location = useLocation()

    window.addEventListener('resize', () => {setWindowWidth(window.innerWidth ? window.innerWidth : '100%')})

    return (
        <Box sx={{ maxWidth: windowWidth, borderBottom: 2, borderColor: 'divider' }}>
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
