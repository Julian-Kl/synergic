import React from 'react'
import { AppProvider } from './AppProvider'
import { Router } from './router/Router'

export const App: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <AppProvider>
                <Router />
            </AppProvider>
        </div>
    )
}
