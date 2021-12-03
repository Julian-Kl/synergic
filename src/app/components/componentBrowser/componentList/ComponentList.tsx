import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedTemplateContext } from '../../../contexts/CurrentEditedTemplate'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { atomProps } from '../../../types/atomProps'
import { ComponentData } from '../../../types/ComponentData'
import { TemplateData } from '../../../types/TemplateData'
import { AtomList } from './AtomList/AtomList'
import { BuilderComponentList } from './BuilderComponentList/BuilderComponentList'


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
        component: atomProps | ComponentData
    ) => {
        if (
            currentEditedComponent?.component &&
            currentEditedGridCell?.id != null
        ) {
            const updatedCurrentEditedComponent: ComponentData = Object.assign(
                {},
                currentEditedComponent?.component
            )

            if(component.type === 'atoms') {
                component.props = component.defaultProps
            }
            
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

    const addComponentToTemplate = async (component: atomProps | ComponentData) => {
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
