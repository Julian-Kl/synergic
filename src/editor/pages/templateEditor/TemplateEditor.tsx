import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { AtomicBrowser } from '../../components/AtomicBrowser/AtomicBrowser'
import { CellChildrenOverview } from '../../components/molecules/CellChildrenOverview/CellChildrenOverview'
import {
    SidebarLeft,
    SidebarRight
} from '../../components/molecules/Sidebar/Sidebar'
import { TemplatePreview } from '../../components/preview/templateEditor/TemplatePreview/TemplatePreview'
import { TemplateBrowser } from '../../components/TemplateBrowser/TemplateBrowser'
import { SelectedTemplateProvider } from '../../contexts/TemplateEditor/SelectedTemplate'

export const TemplateEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Template Editor</title>
                <meta
                    name='description'
                    content='This is the Template Editor'
                />
            </Helmet>
            <SelectedTemplateProvider>
               {/* <SelectedOrganismProvider> */}
               {/* TODO: Use or delete context*/}
                    <AtomicBrowser organisms />
                    <Grid container style={{ minHeight: '90vh' }}>
                        <Grid item xs={2}>
                            <SidebarLeft>
                                <Typography variant='h6' component='h3'>
                                    Templates
                                </Typography>
                                <TemplateBrowser />
                            </SidebarLeft>
                        </Grid>
                        <Grid item xs={8}>
                            <TemplatePreview />
                        </Grid>
                        <SidebarRight>
                            <CellChildrenOverview />
                        </SidebarRight>
                    </Grid>
                {/*</SelectedOrganismProvider>*/}
            </SelectedTemplateProvider>
        </>
    )
}
