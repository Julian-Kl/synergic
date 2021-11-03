import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { ComponentBrowser } from '../../components/composers/componentBrowser/ComponentBrowser'
import { GridComposer } from '../../components/composers/gridComposer/GridComposer'
import { SelectedCellContext } from '../../contexts/componentComposer/SelectedCellContext'

export const ComponentComposer: React.FC = () => {
    const selectedCellContext = useContext(SelectedCellContext);

    return (
        <>
            <Helmet>
                <title>Component Composer</title>
                <meta name='description' content='This is the Component Composer' />
            </Helmet>
            <ComponentBrowser />
            <GridComposer />
        </>
    )
}
