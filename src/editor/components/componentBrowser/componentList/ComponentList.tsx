import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedTemplateContext } from '../../../contexts/CurrentEditedTemplate'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { updateTemplateOrganisms } from '../../../services/templates/updateTemplateOrganisms'
import { Atom } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'
import { Template } from '../../../types/Template'
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
        if (
            currentEditedGridCell?.component ||
            currentEditedTemplate?.template
        ) {
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

    const addComponentToCell = async (component: Atom | Compound) => {
        if (
            currentEditedComponent?.component &&
            currentEditedGridCell?.id != null
        ) {
            const updatedCurrentEditedComponent: Compound = Object.assign(
                {},
                currentEditedComponent?.component
            )

            if (component.type === 'atoms') {
                component.props = component.defaultProps
            }

            updatedCurrentEditedComponent.grid[
                currentEditedGridCell?.id
            ].components.push(component)

            const response = await updateCompoundGrid(
                currentEditedComponent?.component?.id,
                currentEditedComponent?.component?.type,
                updatedCurrentEditedComponent.grid
            )

            if (!response.loading) {
                currentEditedComponent?.setComponent(
                    updatedCurrentEditedComponent
                )
            }
        }
    }

    const addComponentToTemplate = async (component: Atom | Compound) => {
        if (currentEditedTemplate?.template) {
            const updatedEditedTemplate: Template = Object.assign(
                {},
                currentEditedTemplate?.template
            )
            updatedEditedTemplate.organisms.push(component as Compound)
            
            const response = await updateTemplateOrganisms(
                currentEditedTemplate?.template?.id,
                updatedEditedTemplate.organisms
            )

            if (!response.loading) {
                currentEditedTemplate?.setTemplate(updatedEditedTemplate)
            }
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
                        addComponentToCell={
                            currentEditedComponent?.component
                                ? addComponentToCell
                                : addComponentToTemplate
                        }
                        isCreateable={props.isCreateable}
                    />
                </Grid>
            </Box>
        )
    }
}
