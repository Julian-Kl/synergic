import React, { useContext } from 'react'
import { CurrentEditedPageContext } from '../../contexts/CurrentEditedPage'
import { PagePreviewGrid } from './PagePreviewGrid'

export const PagePreview: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    
    return (
        <>
            {currentEditedPage?.page?.content.map((component, index) => (
                <PagePreviewGrid key={index} component={component} locator={['content', index]}/>
            ))}
        </>
    )
}
