import React, { useContext } from 'react'
import { CurrentEditedTemplateContext } from '../../../../contexts/CurrentEditedTemplate'
import { OrganismPreview } from '../../components/OrganismPreview/OrganismPreview'

export const TemplatePreview: React.FC = () => {
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)
    
    return (
        <>
            {currentEditedTemplate?.template?.organisms.map(
                (organism, index) => (
                    <OrganismPreview key={index} organism={organism} />
                )
            )}
        </>
    )
}
