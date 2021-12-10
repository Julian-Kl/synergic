import React, { useContext } from 'react'
import { SelectedPage } from '../../contexts/PageEditor/SelectedPage'
import { PagePreviewGrid } from './PagePreviewGrid'

export const PagePreview: React.FC = () => {
    const selectedPage = useContext(SelectedPage)
    
    return (
        <>
            {selectedPage?.page?.content.map((component, index) => (
                <PagePreviewGrid key={index} component={component} locator={['content', index]}/>
            ))}
        </>
    )
}
