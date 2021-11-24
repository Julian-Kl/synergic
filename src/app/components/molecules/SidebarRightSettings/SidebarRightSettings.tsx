import { Button, Divider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { builderApiUrl } from '../../../services/builderApiUrl'
import { fetchApi } from '../../../services/fetchApi'
import { ComponentData } from '../../../types/ComponentData'
import DeleteIcon from '@mui/icons-material/Delete'

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

export const SidebarRightSettings: React.FC = () => {
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedComponent = useContext(CurrentEditedComponentContext)

    const deleteChildren = async (id: number) => {
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
            const updatedCurrentEditedComponent: ComponentData = Object.assign(
                {},
                currentEditedComponent?.component
            )

            updatedCurrentEditedComponent.grid[
                currentEditedGridCell?.id
            ].components = updatedCellComponents

            const response = await fetchApi(
                `${builderApiUrl}/${currentEditedComponent?.component?.type}/${currentEditedComponent?.component?.id}`,
                'PUT',
                {
                    grid: updatedCurrentEditedComponent.grid,
                }
            )

            if (!response.loading) {
                currentEditedComponent?.setComponent(updatedCurrentEditedComponent)
            }
        }
    }

    return (
        <>
            <Typography variant='h6' component='h3'>
                Cell Children
            </Typography>
            <Divider />
            {currentEditedGridCell?.component?.components.map(
                (component, index) => (
                    <React.Fragment key={index}>
                        <ComponentListItem
                            name={component.name}
                            id={index}
                            deleteFunction={() => deleteChildren(index)}
                        />
                        <Divider />
                    </React.Fragment>
                )
            )}
        </>
    )
}
