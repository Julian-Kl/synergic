import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedPage } from '../../../contexts/PageEditor/SelectedPage'
import { updatePageProperty } from '../../../services/pages/updatePageProperty'
import { updatePageTemplate } from '../../../services/pages/updatePageTemplate'
import { getTemplate } from '../../../services/templates/getTemplate'
import { getTemplates } from '../../../services/templates/getTemplates'
import { Atom } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'
import {
    Page,
    PageAtom,
    PageCompound,
    PageCompoundGrid
} from '../../../types/Page'
import { Template } from '../../../types/Template'
import { LoadingBackdrop } from '../../atoms/LoadingBackdrop/LoadingBackdrop'

export const PageSettings: React.FC = () => {
    const selectedPage = useContext(SelectedPage)
    const [template, setTemplate] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)
    const [descriptionInputRows, setDescriptionInputRows] = useState(1)

    const loadData = async () => {
        const response = await getTemplates()
        setTemplate(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const transformTemplate = (Template: Template): PageCompound[] => {
        const transformAtom = (atom: Atom): PageAtom => {
            const PageAtom: PageAtom = {
                name: atom.name,
                props: atom.props,
            }

            return PageAtom
        }

        const transformMolecule = (molecule: Compound): PageCompound => {
            const transformedMolecule: PageCompound = {
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
            component: Compound | Atom
        ): PageCompound | PageAtom | void => {
            if (component.type === 'atoms') {
                return transformAtom(component as Atom)
            } else if (component.type === 'molecules') {
                return transformMolecule(component as Compound)
            } else if (component.type === 'organisms') {
                console.log('error, componente is organism')
            }
        }

        const mapComponents = (
            components: (Compound | Atom)[]
        ): (PageCompound | PageAtom)[] => {
            const transformedComponentData: (PageCompound | PageAtom)[] = []

            components.map((component) => {
                const result: PageCompound | PageAtom | void = transformSelect(
                    component
                )
                if (result) {
                    transformedComponentData.push(result)
                }
            })
            return transformedComponentData
        }

        const transformOrganisms = (organisms: Compound[]): PageCompound[] => {
            const transformedOrganismList: PageCompound[] = []

            organisms.map((organism) => {
                const transformedOrganism: PageCompound = {
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
        if (selectedPage?.page) {
            const templateResponse = await getTemplate(event.target.value)

            if (!templateResponse.loading) {
                const template = templateResponse.data

                const updatedCurrentEditedPage: Page = Object.assign(
                    {},
                    selectedPage?.page
                )

                updatedCurrentEditedPage.templateId = String(template.id)
                updatedCurrentEditedPage.content = transformTemplate(template)

                transformTemplate(template)

                const response = await updatePageTemplate(
                    selectedPage?.page?.id,
                    updatedCurrentEditedPage.templateId,
                    updatedCurrentEditedPage.content
                )

                if (!response.loading) {
                    selectedPage?.setPage(updatedCurrentEditedPage)
                }
            }
        }
    }

    type property = 'route' | 'title' | 'description'

    const changeProperty = async (property: property, value: string) => {
        if (selectedPage?.page) {
            const updatedPage: Page = Object.assign({}, selectedPage?.page)

            updatedPage[property] = value

            const response = await updatePageProperty(
                selectedPage?.page?.id,
                property,
                updatedPage[property]
            )

            if (!response.loading) {
                selectedPage?.setPage(updatedPage)
            }
        }
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            {selectedPage?.page && (
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
                                    selectedPage?.page?.templateId
                                        ? selectedPage?.page?.templateId
                                        : ''
                                }
                                label='Template'
                                onChange={(event: SelectChangeEvent) =>
                                    changeTemplate(event)
                                }
                            >
                                {template.map((template, index) => (
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
                                selectedPage?.page?.route
                                    ? selectedPage?.page?.route
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
                                selectedPage?.page?.title
                                    ? selectedPage?.page?.title
                                    : ''
                            }
                            onChange={(e) =>
                                changeProperty('title', e.target.value)
                            }
                        />
                    </Box>
                    <Box sx={{ marginLeft: 4 }}>
                        <TextField
                            label='Description'
                            color='primary'
                            multiline
                            rows={descriptionInputRows}
                            value={
                                selectedPage?.page?.description
                                    ? selectedPage?.page?.description
                                    : ''
                            }
                            onChange={(e) =>
                                changeProperty('description', e.target.value)
                            }
                            onFocus={() => setDescriptionInputRows(5)}
                            onBlur={() => setDescriptionInputRows(1)}
                        />
                    </Box>
                </Box>
            )}
        </>
    )
}
