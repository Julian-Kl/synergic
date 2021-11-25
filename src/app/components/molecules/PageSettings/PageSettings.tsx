import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedPageContext } from '../../../contexts/CurrentEditedPage'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { contentApiUrl } from '../../../services/contentApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { PageData } from '../../../types/PageData'
import { TemplateData } from '../../../types/TemplateData'
import { LoadingBackdrop } from '../../atoms/LoadingBackdrop/LoadingBackdrop'

export const PageSettings: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const [data, setData] = useState<TemplateData[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${builderApiUrl}/templates`)
        setData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const changeTemplate = async (event: SelectChangeEvent) => {
        const updatedCurrentEditedPage: PageData = Object.assign(
            {},
            currentEditedPage?.page
        )

        updatedCurrentEditedPage.template = event.target.value as string

        const response = await fetchApi(
            `${contentApiUrl}/pages/${currentEditedPage?.page?.id}`,
            'PUT',
            {
                template: updatedCurrentEditedPage.template,
                content: updatedCurrentEditedPage.content, // Load Default content
                structure: updatedCurrentEditedPage.structure, // Load Structure
            }
        )

        if (!response.loading) {
            currentEditedPage?.setPage(updatedCurrentEditedPage)
        }
    }

    type property = 'route' | 'title'

    const changeProperty = async (property: property, value: string) => {
        const updatedPage: PageData = Object.assign({}, currentEditedPage?.page)

        updatedPage[property] = value

        const response = await fetchApi(
            `${contentApiUrl}/pages/${currentEditedPage?.page?.id}`,
            'PUT',
            {
                [property]: updatedPage[property],
            }
        )

        if (!response.loading) {
            currentEditedPage?.setPage(updatedPage)
        }
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            {currentEditedPage?.page && (
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        height: 'auto',
                        padding: 2,
                        borderBottom: 2,
                        borderColor: '#1565c0',
                    }}
                >
                    <Box sx={{ minWidth: 120 }}>
                        <Typography variant='h6' component='h3'>
                            Settings
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: 240 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                                Template
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={
                                    currentEditedPage?.page?.template
                                        ? currentEditedPage?.page?.template
                                        : ''
                                }
                                label='Template'
                                onChange={(event: SelectChangeEvent) =>
                                    changeTemplate(event)
                                }
                            >
                                {data.map((template, index) => (
                                    <MenuItem key={index} value={template.name}>
                                        {template.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginLeft: 4 }}>
                        <TextField
                            label='Route'
                            color='primary'
                            value={
                                currentEditedPage?.page?.route
                                    ? currentEditedPage?.page?.route
                                    : ''
                            }
                            onChange={(e) =>
                                changeProperty('route', e.target.value)
                            }
                        />
                    </Box>
                    <Box sx={{ marginLeft: 4 }}>
                        <TextField
                            label='Title'
                            color='primary'
                            value={
                                currentEditedPage?.page?.title
                                    ? currentEditedPage?.page?.title
                                    : ''
                            }
                            onChange={(e) =>
                                changeProperty('title', e.target.value)
                            }
                        />
                    </Box>
                </Box>
            )}
        </>
    )
}
