import React from 'react'
import { EditorProvider } from './EditorProvider'
import { Router } from './router/Router'

export const Editor: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <EditorProvider>
                <Router />
            </EditorProvider>
        </div>
    )
}
