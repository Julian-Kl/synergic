import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './services/client'
import CssBaseline from '@mui/material/CssBaseline'

interface Props {
    children: React.ReactNode
}

export const AppProvider: React.FC<Props> = (props: Props) => {
    return (
        <>
            <CssBaseline />
            <ApolloProvider client={client}>
                {props.children}
            </ApolloProvider>
        </>
    )
}
