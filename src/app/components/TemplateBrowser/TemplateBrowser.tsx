import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedTemplateContext } from '../../contexts/CurrentEditedTemplate'
import { builderApiUrl } from '../../services/base/builderApiUrl'
import { fetchApi } from '../../services/base/fetchApi'
import { Template } from '../../types/Template'
import { AddTemplate } from '../atoms/AddTemplate/AddTemplate'
import { LoadingBackdrop } from '../atoms/LoadingBackdrop/LoadingBackdrop'
import { TemplateBrowserItem } from './TemplateBrowserItem/TemplateBrowserItem'

export const TemplateBrowser: React.FC = () => {
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)
    const [data, setData] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${builderApiUrl}/templates`)
        setData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const createTemplate = async (name: string) => {
        if (name) {
            const response = await fetchApi(
                `${builderApiUrl}/templates`,
                'POST',
                {
                    name: name,
                    organisms: [],
                }
            )
            data.push(response.data)
            setData([...data])
        }
    }

    const deleteTemplate = async (id: number) => {
        if (id) {
            const response = await fetchApi(
                `${builderApiUrl}/templates/${id}`,
                'DELETE'
            )

            const updatedData: Template[] = data.filter(function (value) {
                return value.id != response.data.id
            })

            setData([...updatedData])
            currentEditedTemplate?.setTemplate(null)
        }
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
                {data &&
                    data.map((template: Template) => (
                        <Grid
                            key={template.id}
                            item
                            xs={12}
                            onClick={() => selectTemplate(template)}
                        >
                            <TemplateBrowserItem
                                id={template.id}
                                deleteTemplate={deleteTemplate}
                                selected={isSelected(template)}
                            >
                                {template.name}
                            </TemplateBrowserItem>
                        </Grid>
                    ))}
                <AddTemplate
                    components='templates'
                    createComponent={createTemplate}
                />
            </Grid>
        </>
    )
}
