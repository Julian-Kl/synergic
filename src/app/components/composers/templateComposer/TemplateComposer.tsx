import React, { useContext } from 'react'
import { CurrentEditedTemplateContext } from '../../../contexts/CurrentEditedTemplate'
import { CurrentEditedTemplateComponentContext } from '../../../contexts/CurrentEditedTemplateComponent'
import { OrganismPreview } from '../../builderComponents/organismPreview/OrganismPreview'

export const TemplateComposer: React.FC = () => {
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)
    const currentEditedTemplateComponent = useContext(
        CurrentEditedTemplateComponentContext
    )

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
