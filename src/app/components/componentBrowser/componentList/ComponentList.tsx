import React, { useContext } from 'react'
import { Box, Grid } from '@mui/material'
import { BuilderComponentList } from './BuilderComponentList/BuilderComponentList'
import { AtomList } from './AtomList/AtomList'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { ComponentData } from '../../../types/ComponentData'
import { atomMetadata } from '../../../../builder/types/atomMetadata'
import { fetchApi } from '../../../services/fetchApi'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { CurrentEditedTemplateContext } from '../../../contexts/CurrentEditedTemplate'
import { TemplateData } from '../../../types/TemplateData'


interface Props {
    components: 'atoms' | 'molecules' | 'organisms'
    isCreateable: boolean | undefined
}

export const ComponentList: React.FC<Props> = (props: Props) => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)

    const isAddAble = (
        components: 'atoms' | 'molecules' | 'organisms'
    ): boolean => {
        if (currentEditedGridCell?.component || currentEditedTemplate?.template) {
            if (
                currentEditedComponent?.component?.type === 'molecules' &&
                components === 'atoms'
            ) {
                return true
            } else if (
                currentEditedComponent?.component?.type === 'organisms' &&
                (components === 'atoms' || components === 'molecules')
            ) {
                return true
            } else if (currentEditedTemplate?.template?.type === 'templates') {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const addComponentToCell = async (
        component: atomMetadata | ComponentData
    ) => {
        if (
            currentEditedComponent?.component &&
            currentEditedGridCell?.id != null
        ) {
            const updatedCurrentEditedComponent: ComponentData = Object.assign(
                {},
                currentEditedComponent?.component
            )
            updatedCurrentEditedComponent.grid[
                currentEditedGridCell?.id
            ].components.push(component)

            const response = await fetchApi(
                `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
                'PUT',
                {
                    grid: updatedCurrentEditedComponent.grid,
                }
            )

            if (!response.loading) {
                currentEditedComponent?.setComponent(
                    updatedCurrentEditedComponent
                )
            }
        }
    }

    const addComponentToTemplate = async (component: atomMetadata | ComponentData) => {
        const updatedEditedTemplate: TemplateData = Object.assign({}, currentEditedTemplate?.template)
        updatedEditedTemplate.organisms.push(component as ComponentData)
        
        const response = await fetchApi(
            `${builderApiUrl}/templates/${currentEditedTemplate?.template?.id}`,
            'PUT',
            {
                organisms: updatedEditedTemplate.organisms,
            }
        )

        if (!response.loading) {
            currentEditedTemplate?.setTemplate(
                updatedEditedTemplate
            )
        }
    }

    if (props.components === 'atoms') {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <AtomList
                        isAddAble={isAddAble('atoms')}
                        addComponentToCell={addComponentToCell}
                    />
                </Grid>
            </Box>
        )
    } else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <BuilderComponentList
                        components={props.components}
                        isAddAble={isAddAble(props.components)}
                        addComponentToCell={currentEditedComponent?.component ? addComponentToCell : addComponentToTemplate}
                        isCreateable={props.isCreateable}
                    />
                </Grid>
            </Box>
        )
    }
}
