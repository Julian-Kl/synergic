import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/componentBrowser/ComponentBrowser'
import { SidebarLeft } from '../../components/molecules/Sidebar/Sidebar'
import { TemplateBrowser } from '../../components/TemplateBrowser/TemplateBrowser'
import { CurrentEditedTemplateContextProvider } from '../../contexts/CurrentEditedTemplate'

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
                    <Grid item xs={10}>
                        Editor
                    </Grid>
                </Grid>
            </CurrentEditedTemplateContextProvider>
        </>
    )
}
