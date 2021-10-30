import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/composers/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'

export const ComponentComposer: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Component Composer</title>
                <meta name='description' content='This is the Component Composer' />
            </Helmet>
            <ComponentBrowser />
            <div style={{height: 60}}></div>
            <GridComposer />
        </>
    )
}
