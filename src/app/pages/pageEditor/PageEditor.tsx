import React from 'react'
import { Helmet } from 'react-helmet-async'

export const PageEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Page Editor</title>
                <meta name='description' content='This is the Page Editor' />
            </Helmet>
            <p>Page Editor</p>
        </>
    )
}
