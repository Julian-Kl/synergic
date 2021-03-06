import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSettings } from '../../components/molecules/PageSettings/PageSettings'
import { SidebarLeft } from '../../components/molecules/Sidebar/Sidebar'
import { PageBrowser } from '../../components/PageBrowser/PageBrowser'
import { PagePreview } from '../../components/PagePreview/PagePreview'
import { SelectedAtomProvider } from '../../contexts/PageEditor/SelectedAtom'
import { SelectedPageProvider } from '../../contexts/PageEditor/SelectedPage'

export const PageEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Page Editor</title>
                <meta name='description' content='This is the Page Editor' />
            </Helmet>
            <SelectedPageProvider>
                <SelectedAtomProvider>
                    <Grid container style={{ minHeight: '90vh' }}>
                        <Grid item xs={2}>
                            <SidebarLeft>
                                <Typography variant='h6' component='h3'>
                                    Pages
                                </Typography>
                                <PageBrowser />
                            </SidebarLeft>
                        </Grid>
                        <Grid item xs={10}>
                            <PageSettings />
                            <PagePreview />
                        </Grid>
                    </Grid>
                </SelectedAtomProvider>
            </SelectedPageProvider>
        </>
    )
}
