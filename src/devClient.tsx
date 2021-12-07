import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Editor } from './editor/Editor'

render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <Editor />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>,
    document.getElementById('app')
)
