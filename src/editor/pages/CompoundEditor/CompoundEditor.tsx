import { Divider, Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { CompoundLevelProps } from '../../components/molecules/CompoundLevelProps/CompoundLevelProps'
import { GridCellSettings } from '../../components/molecules/GridCellSettings/GridCellSettings'
import {
    SidebarLeft
} from '../../components/molecules/Sidebar/Sidebar'
import { CompoundPreview } from '../../components/preview/compoundEditor/CompoundPreview/GridPreview/GridPreview'
import { SelectedCompoundProvider } from '../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCellProvider } from '../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedGridCellComponentProvider } from '../../contexts/CompoundEditor/SelectedGridCellComponent'

export const CompoundEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Components</title>
                <meta
                    name='description'
                    content='This is the Component Editor'
                />
            </Helmet>
            <SelectedCompoundProvider>
                <SelectedGridCellProvider>
                    <SelectedGridCellComponentProvider>
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
                                <CompoundPreview />
                            </Grid>
                        </Grid>
                    </SelectedGridCellComponentProvider>
                </SelectedGridCellProvider>
            </SelectedCompoundProvider>
        </>
    )
}
