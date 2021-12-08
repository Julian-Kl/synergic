import { Divider, Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'
import { CompoundLevelProps } from '../../components/molecules/CompoundLevelProps/CompoundLevelProps'
import { GridCellSettings } from '../../components/molecules/GridCellSettings/GridCellSettings'
import {
    SidebarLeft
} from '../../components/molecules/Sidebar/Sidebar'
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
                                    <GridCellSettings />
                                    <Divider variant='fullWidth' />
                                    <CompoundLevelProps />
                                </SidebarLeft>
                            </Grid>
                            <Grid item xs={10}>
                                <GridComposer />
                            </Grid>
                        </Grid>
                    </CurrentEditedGridCellComponentContextProvider>
                </CurrentEditedGridCellContextProvider>
            </CurrentEditedComponentContextProvider>
        </>
    )
}
