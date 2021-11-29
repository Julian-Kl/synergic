import { CssBaseline } from '@mui/material'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { PageRouter } from './pageRouter/PageRouter'
export const App: React.FC = () => {

    return (
        <HelmetProvider>
            <CssBaseline />
            <PageRouter />
        </HelmetProvider>
    )
}
