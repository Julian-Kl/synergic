import { Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'
import {
    SidebarLeft,
    SidebarRight
} from '../../components/molecules/Sidebar/Sidebar'
import { SidebarLeftSettings } from '../../components/molecules/SidebarLeftSettings/SidebarLeftSettings'
import { SidebarRightSettings } from '../../components/molecules/SidebarRightSettings/SidebarRightSettings'
import { CurrentEditedComponentContextProvider } from '../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContextProvider } from '../../contexts/CurrentEditedGridCell'
import { CurrentEditedGridCellComponentContextProvider } from '../../contexts/CurrentEditedGridCellComponent'

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
                    <CurrentEditedGridCellComponentContextProvider>
                        <ComponentBrowser isCreateable />
                        <Grid container style={{ minHeight: '70vh' }}>
                            <Grid item xs={2}>
                                <SidebarLeft>
                                    <SidebarLeftSettings />
                                </SidebarLeft>
                            </Grid>
                            <Grid item xs={8}>
                                <GridComposer />
                            </Grid>
                            <Grid item xs={2}>
                                <SidebarRight>
                                    <SidebarRightSettings />
                                </SidebarRight>
                            </Grid>
                        </Grid>
                    </CurrentEditedGridCellComponentContextProvider>
                </CurrentEditedGridCellContextProvider>
            </CurrentEditedComponentContextProvider>
        </>
    )
}
