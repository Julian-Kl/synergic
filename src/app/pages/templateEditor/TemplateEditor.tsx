import React from 'react'
import { Helmet } from 'react-helmet-async'

export const TemplateEditor: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Template Editor</title>
                <meta name='description' content='This is the Template Editor' />
            </Helmet>
            <p>Template Editor</p>
        </>
    )
}
