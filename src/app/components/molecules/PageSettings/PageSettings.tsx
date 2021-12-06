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
import { Atom } from '../../../types/Atom'
import { AtomicCompound } from '../../../types/AtomicCompound'
import { Page, PageAtom, PageAtomicCompound, PageCompoundGrid } from '../../../types/Page'
import { Template } from '../../../types/Template'
import { LoadingBackdrop } from '../../atoms/LoadingBackdrop/LoadingBackdrop'

export const PageSettings: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const [Template, setTemplate] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${builderApiUrl}/templates`)
        setTemplate(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadTemplate = async (id: string) => {
        const response = await fetchApi(
            `${builderApiUrl}/templates/${id}`,
            'GET'
        )

        if (!response.loading) {
            return response.data
        }
    }

    const transformTemplate = (
        Template: Template
    ): PageAtomicCompound[] => {
        const transformAtom = (atom: Atom): PageAtom => {
            const PageAtom: PageAtom = {
                name: atom.name,
                props: atom.props,
            }

            return PageAtom
        }

        const transformMolecule = (
            molecule: AtomicCompound
        ): PageAtomicCompound => {
            const transformedMolecule: PageAtomicCompound = {
                grid: [],
            }

            molecule.grid.map((gridItem) => {
                const transformedGridItem: PageCompoundGrid = {
                    size: gridItem.size,
                    components: mapComponents(gridItem.components),
                }

                transformedMolecule.grid.push(transformedGridItem)
            })

            return transformedMolecule
        }

        const transformSelect = (
            component: AtomicCompound | Atom
        ): PageAtomicCompound | PageAtom | void => {
            if (component.type === 'atoms') {
                return transformAtom(component as Atom)
            } else if (component.type === 'molecules') {
                return transformMolecule(component as AtomicCompound)
            } else if (component.type === 'organisms') {
                console.log('error, componente is organism')
            }
        }

        const mapComponents = (
            components: (AtomicCompound | Atom)[]
        ): (PageAtomicCompound | PageAtom)[] => {
            const transformedComponentData: (
                | PageAtomicCompound
                | PageAtom
            )[] = []

            components.map((component) => {
                const result:
                    | PageAtomicCompound
                    | PageAtom
                    | void = transformSelect(component)
                if (result) {
                    transformedComponentData.push(result)
                }
            })
            return transformedComponentData
        }

        const transformOrganisms = (
            organisms: AtomicCompound[]
        ): PageAtomicCompound[] => {
            const transformedOrganismList: PageAtomicCompound[] = []

            organisms.map((organism) => {
                const transformedOrganism: PageAtomicCompound = {
                    grid: [],
                }

                organism.grid.map((gridItem) => {
                    const transformedGridItem: PageCompoundGrid = {
                        size: gridItem.size,
                        components: mapComponents(gridItem.components),
                    }

                    transformedOrganism.grid.push(transformedGridItem)
                })
                transformedOrganismList.push(transformedOrganism)
            })

            return transformedOrganismList
        }

        return transformOrganisms(Template.organisms)
    }

    const changeTemplate = async (event: SelectChangeEvent) => {
        const Template: Template = await loadTemplate(
            event.target.value
        )

        const updatedCurrentEditedPage: Page = Object.assign(
            {},
            currentEditedPage?.page
        )

        updatedCurrentEditedPage.templateId = String(Template.id)
        updatedCurrentEditedPage.content = transformTemplate(Template)

        transformTemplate(Template)

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
        const updatedPage: Page = Object.assign({}, currentEditedPage?.page)

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
                                {Template.map((template, index) => (
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
