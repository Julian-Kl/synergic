import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
interface Props {
    children: React.ReactNode
}

export const AppProvider: React.FC<Props> = (props: Props) => {
    return (
        <>
            <CssBaseline />
            {props.children}
        </>
    )
}
