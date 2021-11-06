import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'
import {
    SidebarLeft,
    SidebarRight,
} from '../../components/molecules/Sidebar/Sidebar'
import { SidebarLeftSettings } from '../../components/molecules/SidebarLeftSettings/SidebarLeftSettings'
import { CurrentEditedComponentContextProvider } from '../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContextProvider } from '../../contexts/CurrentEditedGridCell'

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
            <CurrentEditedComponentContextProvider>
                <CurrentEditedGridCellContextProvider>
                    <ComponentBrowser />
                    <Grid container style={{ minHeight: '75vh' }}>
                        <Grid item xs={2}>
                            <SidebarRight>
                                <SidebarLeftSettings />
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
                                >
                                    Some Settings
                                </Typography>
                            </SidebarLeft>
                        </Grid>
                    </Grid>
                </CurrentEditedGridCellContextProvider>
            </CurrentEditedComponentContextProvider>
        </>
    )
}
