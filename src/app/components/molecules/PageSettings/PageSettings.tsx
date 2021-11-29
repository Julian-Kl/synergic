import {
    Box,
    FormControl, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedPageContext } from '../../../contexts/CurrentEditedPage'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { contentApiUrl } from '../../../services/contentApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { atomMetadata } from '../../../types/atomMetadata'
import { ComponentData } from '../../../types/ComponentData'
import { PageData, structureAtom, StructureComponentData, structureComponentGrid } from '../../../types/PageData'
import { TemplateData } from '../../../types/TemplateData'
import { LoadingBackdrop } from '../../atoms/LoadingBackdrop/LoadingBackdrop'

export const PageSettings: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const [templateData, setTemplateData] = useState<TemplateData[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${builderApiUrl}/templates`)
        setTemplateData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadTemplateData = async (id: string) => {
        const response = await fetchApi(
            `${builderApiUrl}/templates/${id}`,
            'GET'
        )

        if (!response.loading) {
            return response.data
        }
    }

    const transformTemplateData = (
        templateData: TemplateData
    ): StructureComponentData[] => {
        const transformAtom = (atom: atomMetadata): structureAtom => {
            const structureAtom: structureAtom = {
                name: atom.name,
                props: atom.props,
            }

            return structureAtom
        }

        const transformMolecule = (
            molecule: ComponentData
        ): StructureComponentData => {
            const transformedMolecule: StructureComponentData = {
                grid: [],
            }

            molecule.grid.map((gridItem) => {
                const transformedGridItem: structureComponentGrid = {
                    size: gridItem.size,
                    components: mapComponents(gridItem.components),
                }

                transformedMolecule.grid.push(transformedGridItem)
            })

            return transformedMolecule
        }

        const transformSelect = (
            component: ComponentData | atomMetadata
        ): StructureComponentData | structureAtom | void => {
            if (component.type === 'atoms') {
                return transformAtom(component as atomMetadata)
            } else if (component.type === 'molecules') {
                return transformMolecule(component as ComponentData)
            } else if (component.type === 'organisms') {
                console.log('error, componente is organism')
            }
        }

        const mapComponents = (
            components: (ComponentData | atomMetadata)[]
        ): (StructureComponentData | structureAtom)[] => {
            const transformedComponentData: (
                | StructureComponentData
                | structureAtom
            )[] = []

            components.map((component) => {
                const result:
                    | StructureComponentData
                    | structureAtom
                    | void = transformSelect(component)
                if (result) {
                    transformedComponentData.push(result)
                }
            })
            return transformedComponentData
        }

        const transformOrganisms = (
            organisms: ComponentData[]
        ): StructureComponentData[] => {
            const transformedOrganismList: StructureComponentData[] = []

            organisms.map((organism) => {
                const transformedOrganism: StructureComponentData = {
                    grid: [],
                }

                organism.grid.map((gridItem) => {
                    const transformedGridItem: structureComponentGrid = {
                        size: gridItem.size,
                        components: mapComponents(gridItem.components),
                    }

                    transformedOrganism.grid.push(transformedGridItem)
                })
                transformedOrganismList.push(transformedOrganism)
            })

            return transformedOrganismList
        }

        return transformOrganisms(templateData.organisms)
    }

    const changeTemplate = async (event: SelectChangeEvent) => {
        const templateData: TemplateData = await loadTemplateData(
            event.target.value
        )

        const updatedCurrentEditedPage: PageData = Object.assign(
            {},
            currentEditedPage?.page
        )

        updatedCurrentEditedPage.templateId = String(templateData.id)
        updatedCurrentEditedPage.content = transformTemplateData(templateData)

        transformTemplateData(templateData)

        const response = await fetchApi(
            `${contentApiUrl}/pages/${currentEditedPage?.page?.id}`,
            'PUT',
            {
                templateId: updatedCurrentEditedPage.templateId,
                content: updatedCurrentEditedPage.content,
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
                                    currentEditedPage?.page?.templateId
                                        ? currentEditedPage?.page?.templateId
                                        : ''
                                }
                                label='Template'
                                onChange={(event: SelectChangeEvent) =>
                                    changeTemplate(event)
                                }
                            >
                                {templateData.map((template, index) => (
                                    <MenuItem key={index} value={template.id}>
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
