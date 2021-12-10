import React, { useContext } from 'react'
import { SelectedTemplate } from '../../../../contexts/TemplateEditor/SelectedTemplate'
import { OrganismPreview } from '../../components/OrganismPreview/OrganismPreview'

export const TemplatePreview: React.FC = () => {
    const selectedTemplate = useContext(SelectedTemplate)
    
    return (
        <>
            {selectedTemplate?.template?.organisms.map(
                (organism, index) => (
                    <OrganismPreview key={index} organism={organism} />
                )
            )}
        </>
    )
}
