import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'

interface Props {
    children: React.ReactNode
}

export const EditorProvider: React.FC<Props> = (props: Props) => {
    return (
        <>
            <CssBaseline />
            {props.children}
        </>
    )
}
