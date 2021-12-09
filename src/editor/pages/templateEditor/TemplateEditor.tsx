import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { CellChildrenOverview } from '../../components/molecules/CellChildrenOverview/CellChildrenOverview'
import {
    SidebarLeft,
    SidebarRight
} from '../../components/molecules/Sidebar/Sidebar'
import { TemplatePreview } from '../../components/preview/templateEditor/TemplatePreview/TemplatePreview'
import { TemplateBrowser } from '../../components/TemplateBrowser/TemplateBrowser'
import { CurrentEditedTemplateContextProvider } from '../../contexts/CurrentEditedTemplate'
import { CurrentEditedTemplateComponentContextProvider } from '../../contexts/CurrentEditedTemplateComponent'

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
            <CurrentEditedTemplateContextProvider>
                <CurrentEditedTemplateComponentContextProvider>
                    <ComponentBrowser organisms />
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
                </CurrentEditedTemplateComponentContextProvider>
            </CurrentEditedTemplateContextProvider>
        </>
    )
}
