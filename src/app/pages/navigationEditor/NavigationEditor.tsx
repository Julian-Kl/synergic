import React from 'react'
import { Helmet } from 'react-helmet-async'

export const NavigationEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Navigation Editor</title>
                <meta name='description' content='This is the Navigation Editor' />
            </Helmet>
            <p>Navigation Editor</p>
        </>
    )
}
