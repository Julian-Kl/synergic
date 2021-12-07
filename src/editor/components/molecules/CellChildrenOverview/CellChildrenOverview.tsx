import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Divider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedTemplateContext } from '../../../contexts/CurrentEditedTemplate'
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
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const currentEditedTemplate = useContext(CurrentEditedTemplateContext)

    let components: (Atom | Compound)[] = []
    let isOrganism: boolean

    if (currentEditedGridCell?.component?.components) {
        components = currentEditedGridCell?.component?.components
        isOrganism = false
    } else if (currentEditedTemplate?.template?.organisms) {
        components = currentEditedTemplate?.template?.organisms
        isOrganism = true
    }

    const deleteNestedComponent = async (id: number) => {
        if (currentEditedComponent?.component) {
            const updatedCellComponents = currentEditedGridCell?.component?.components.filter(
                function (value, index, arr) {
                    return index != id
                }
            )

            if (
                currentEditedGridCell?.id != null &&
                updatedCellComponents &&
                currentEditedGridCell
            ) {
                const updatedCurrentEditedComponent: Compound = Object.assign(
                    {},
                    currentEditedComponent?.component
                )

                updatedCurrentEditedComponent.grid[
                    currentEditedGridCell?.id
                ].components = updatedCellComponents

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
    }

    const deleteNestedOrganism = async (id: number) => {
        if (currentEditedTemplate?.template) {
            const updatedTemplateOrganisms = currentEditedTemplate?.template?.organisms.filter(
                function (value, index, arr) {
                    return index != id
                }
            )

            const updatedCurrentEditedTemplate: Template = Object.assign(
                {},
                currentEditedTemplate?.template
            )

            updatedCurrentEditedTemplate.organisms = updatedTemplateOrganisms

            const response = await updateTemplateOrganisms(
                currentEditedTemplate.template.id,
                updatedCurrentEditedTemplate.organisms
            )

            if (!response.loading) {
                currentEditedTemplate?.setTemplate(updatedCurrentEditedTemplate)
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