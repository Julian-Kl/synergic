import React from 'react'
import { Helmet } from 'react-helmet-async'

export const ComponentComposer: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Component Composer</title>
                <meta name='description' content='This is the Component Composer' />
            </Helmet>
            <p>Component Composer</p>
        </>
    )
}
