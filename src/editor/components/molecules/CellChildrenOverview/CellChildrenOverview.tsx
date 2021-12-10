import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Divider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SelectedCompound } from '../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedTemplate } from '../../../contexts/TemplateEditor/SelectedTemplate'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { updateTemplateOrganisms } from '../../../services/templates/updateTemplateOrganisms'
import { Atom } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'
import { Template } from '../../../types/Template'

interface ComponentListItemProps {
    name: string
    id: number
    deleteFunction: () => void
}

const ComponentListItem: React.FC<ComponentListItemProps> = (
    props: ComponentListItemProps
) => {
    return (
        <Typography variant='body1' component='p' align='left'>
            {props.name}
            <Button
                color='inherit'
                variant='text'
                onClick={() => props.deleteFunction()}
            >
                <DeleteIcon fontSize='small' />
            </Button>
        </Typography>
    )
}

export const CellChildrenOverview: React.FC = () => {
    const selectedGridCell = useContext(SelectedGridCell)
    const selectedCompound = useContext(SelectedCompound)
    const selectedTemplate = useContext(SelectedTemplate)

    let components: (Atom | Compound)[] = []
    let isOrganism: boolean

    if (selectedGridCell?.gridCell?.components) {
        components = selectedGridCell?.gridCell?.components
        isOrganism = false
    } else if (selectedTemplate?.template?.organisms) {
        components = selectedTemplate?.template?.organisms
        isOrganism = true
    }

    const deleteNestedComponent = async (id: number) => {
        if (selectedCompound?.compound) {
            const updatedCellComponents = selectedGridCell?.gridCell?.components.filter(
                function (value, index, arr) {
                    return index != id
                }
            )

            if (
                selectedGridCell?.id != null &&
                updatedCellComponents &&
                selectedGridCell
            ) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    selectedCompound?.compound
                )

                updatedCurrentEditedComponent.grid[
                    selectedGridCell?.id
                ].components = updatedCellComponents

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
    }

    const deleteNestedOrganism = async (id: number) => {
        if (selectedTemplate?.template) {
            const updatedTemplateOrganisms = selectedTemplate?.template?.organisms.filter(
                function (value, index, arr) {
                    return index != id
                }
            )

            const updatedCurrentEditedTemplate: Template = Object.assign(
                {},
                selectedTemplate?.template
            )

            updatedCurrentEditedTemplate.organisms = updatedTemplateOrganisms

            const response = await updateTemplateOrganisms(
                selectedTemplate.template.id,
                updatedCurrentEditedTemplate.organisms
            )

            if (!response.loading) {
                selectedTemplate?.setTemplate(updatedCurrentEditedTemplate)
            }
        }
    }

    return (
        <>
            <Typography variant='h6' component='h3'>
                Cell Children
            </Typography>
            <Divider />
            {components.map((component, index) => (
                <React.Fragment key={index}>
                    <ComponentListItem
                        name={component.name}
                        id={index}
                        deleteFunction={
                            isOrganism
                                ? () => deleteNestedOrganism(index)
                                : () => deleteNestedComponent(index)
                        }
                    />
                    <Divider />
                </React.Fragment>
            ))}
        </>
    )
}
