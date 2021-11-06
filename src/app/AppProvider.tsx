import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { CurrentEditedComponentContextProvider } from './contexts/CurrentEditedComponentContext'

interface Props {
    children: React.ReactNode
}

export const AppProvider: React.FC<Props> = (props: Props) => {
    return (
        <>
            <CssBaseline />
            <CurrentEditedComponentContextProvider>
                {props.children}
            </CurrentEditedComponentContextProvider>
        </>
    )
}
