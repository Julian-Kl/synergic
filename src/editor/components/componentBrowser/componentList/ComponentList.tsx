import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { SelectedCompound } from '../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedTemplate } from '../../../contexts/TemplateEditor/SelectedTemplate'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { updateTemplateOrganisms } from '../../../services/templates/updateTemplateOrganisms'
import { Atom } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'
import { Template } from '../../../types/Template'
import { AtomList } from './AtomList/AtomList'
import { CompoundList } from './CompoundList/CompoundList'

interface Props {
    components: 'atoms' | 'molecules' | 'organisms'
    isCreateable: boolean | undefined
}

export const ComponentList: React.FC<Props> = (props: Props) => {
    const selectedCompound = useContext(SelectedCompound)
    const selectedGridCell = useContext(SelectedGridCell)
    const selectedTemplate = useContext(SelectedTemplate)

    const isAddAble = (
        components: 'atoms' | 'molecules' | 'organisms'
    ): boolean => {
        if (
            selectedGridCell?.gridCell ||
            selectedTemplate?.template
        ) {
            if (
                selectedCompound?.compound?.type === 'molecules' &&
                components === 'atoms'
            ) {
                return true
            } else if (
                selectedCompound?.compound?.type === 'organisms' &&
                (components === 'atoms' || components === 'molecules')
            ) {
                return true
            } else if (selectedTemplate?.template?.type === 'templates') {
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
            selectedCompound?.compound &&
            selectedGridCell?.id != null
        ) {
            const updatedCurrentEditedComponent: Compound = Object.assign(
                {},
                selectedCompound?.compound
            )

            updatedCurrentEditedComponent.grid[
                selectedGridCell?.id
            ].components.push(component)

            const response = await updateCompoundGrid(
                selectedCompound?.compound?.id,
                selectedCompound?.compound?.type,
                updatedCurrentEditedComponent.grid
            )

            if (!response.loading) {
                selectedCompound?.setCompound(
                    updatedCurrentEditedComponent
                )
            }
        }
    }

    const addComponentToTemplate = async (component: Atom | Compound) => {
        if (selectedTemplate?.template) {
            const updatedEditedTemplate: Template = Object.assign(
                {},
                selectedTemplate?.template
            )
            updatedEditedTemplate.organisms.push(component as Compound)
            
            const response = await updateTemplateOrganisms(
                selectedTemplate?.template?.id,
                updatedEditedTemplate.organisms
            )

            if (!response.loading) {
                selectedTemplate?.setTemplate(updatedEditedTemplate)
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
                    <CompoundList
                        components={props.components}
                        isAddAble={isAddAble(props.components)}
                        addComponentToCell={
                            selectedCompound?.compound
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
