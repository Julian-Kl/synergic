import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'
import {
    SidebarLeft,
    SidebarRight,
} from '../../components/molecules/Sidebar/Sidebar'

export const ComponentCreator: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>Components</title>
                <meta
                    name='description'
                    content='This is the Component Editor'
                />
            </Helmet>
            <ComponentBrowser />
            <Grid container style={{ minHeight: '75vh' }}>
                <Grid item xs={2}>
                    <SidebarRight>
                        <Typography
                            variant='h6'
                            component='h3'
                            style={{ paddingTop: 20 }}
                        >
                            Component Settings
                        </Typography>
                    </SidebarRight>
                </Grid>
                <Grid item xs={8}>
                    <GridComposer />
                </Grid>
                <Grid item xs={2}>
                    <SidebarLeft>
                        <Typography
                            variant='h6'
                            component='h3'
                            style={{ paddingTop: 20 }}
                        >
                            Atom Settings
                        </Typography>
                    </SidebarLeft>
                </Grid>
            </Grid>
        </>
    )
}
