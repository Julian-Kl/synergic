import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedTemplateContext } from '../../contexts/CurrentEditedTemplate'
import { createTemplate } from '../../services/templates/createTemplate'
import { deleteTemplate } from '../../services/templates/deleteTemplate'
import { getTemplates } from '../../services/templates/getTemplates'
import { Template } from '../../types/Template'
import { AddTemplate } from '../atoms/AddTemplate/AddTemplate'
import { LoadingBackdrop } from '../atoms/LoadingBackdrop/LoadingBackdrop'
import { TemplateBrowserItem } from './TemplateBrowserItem/TemplateBrowserItem'

export const TemplateBrowser: React.FC = () => {
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)
    const [templates, setTemplates] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await getTemplates()
        setTemplates(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const addTemplate = async (name: string) => {
        const response = await createTemplate(name)
        templates.push(response.data)
        setTemplates([...templates])
    }

    const removeTemplate = async (id: number) => {
        const response = await deleteTemplate(id)

        const updatedData: Template[] = templates.filter(function (value) {
            return value.id != response.data.id
        })

        setTemplates([...updatedData])
        currentEditedTemplate?.setTemplate(null)
    }

    const selectTemplate = (template: Template) => {
        currentEditedTemplate?.setTemplate(template)
    }

    const isSelected = (template: Template) => {
        return template.id === currentEditedTemplate?.template?.id
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            <Grid container spacing={2}>
                {templates &&
                    templates.map((template: Template) => (
                        <Grid
                            key={template.id}
                            item
                            xs={12}
                            onClick={() => selectTemplate(template)}
                        >
                            <TemplateBrowserItem
                                id={template.id}
                                deleteTemplate={removeTemplate}
                                selected={isSelected(template)}
                            >
                                {template.name}
                            </TemplateBrowserItem>
                        </Grid>
                    ))}
                <AddTemplate
                    components='templates'
                    createComponent={addTemplate}
                />
            </Grid>
        </>
    )
}
