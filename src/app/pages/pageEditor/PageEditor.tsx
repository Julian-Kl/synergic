import { Grid } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SidebarLeft } from '../../components/molecules/Sidebar/Sidebar'

export const PageEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Page Editor</title>
                <meta name='description' content='This is the Page Editor' />
            </Helmet>
            <Grid container style={{ minHeight: '90vh' }}>
                <Grid item xs={2}>
                    <SidebarLeft>Page Editor</SidebarLeft>
                </Grid>
                <Grid item xs={10}>
                    Editor
                </Grid>
            </Grid>
        </>
    )
}
