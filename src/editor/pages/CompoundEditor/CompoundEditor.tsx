import { Divider, Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { AtomicBrowser } from '../../components/AtomicBrowser/AtomicBrowser'
import { CompoundLevelPropSettings } from '../../components/molecules/CompoundLevelPropsSettings/CompoundLevelPropsSettings'
import { GridCellSettings } from '../../components/molecules/GridCellSettings/GridCellSettings'
import {
    SidebarLeft
} from '../../components/molecules/Sidebar/Sidebar'
import { CompoundPreview } from '../../components/preview/compoundEditor/CompoundPreview/GridPreview/GridPreview'
import { SelectedCompoundProvider } from '../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCellProvider } from '../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedGridCellChildProvider } from '../../contexts/CompoundEditor/SelectedGridCellChild'

export const CompoundEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Compound Editor</title>
                <meta
                    name='description'
                    content='This is the Compound Editor'
                />
            </Helmet>
            <SelectedCompoundProvider>
                <SelectedGridCellProvider>
                    <SelectedGridCellChildProvider>
                        <AtomicBrowser isCreateable />
                        <Grid container style={{ minHeight: '70vh' }}>
                            <Grid item xs={2}>
                                <SidebarLeft>
                                    <GridCellSettings />
                                    <Divider variant='fullWidth' />
                                    <CompoundLevelPropSettings />
                                </SidebarLeft>
                            </Grid>
                            <Grid item xs={10}>
                                <CompoundPreview />
                            </Grid>
                        </Grid>
                    </SelectedGridCellChildProvider>
                </SelectedGridCellProvider>
            </SelectedCompoundProvider>
        </>
    )
}
