import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { LoadingContextProvider } from './contexts/LoadingContext'

interface Props {
    children: React.ReactNode
}

export const AppProvider: React.FC<Props> = (props: Props) => {
    return (
        <>
            <CssBaseline />
            <LoadingContextProvider>{props.children}</LoadingContextProvider>
        </>
    )
}
