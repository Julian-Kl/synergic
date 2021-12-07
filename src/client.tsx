import React, { StrictMode } from 'react'
import { hydrate } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Editor } from './editor/Editor'

hydrate(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <Editor />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>,
    document.getElementById('app')
)