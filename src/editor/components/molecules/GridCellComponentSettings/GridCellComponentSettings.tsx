import DeleteIcon from '@mui/icons-material/Delete'
import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { atomRegistry } from '../../../../resources/components/atoms/atomRegistry'
import { CurrentEditedComponentContext } from '../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../contexts/CurrentEditedGridCell'
import { CurrentEditedGridCellComponentContext } from '../../../contexts/CurrentEditedGridCellComponent'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { Atom } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'

export const GridCellComponentSettings: React.FC = () => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedGridCellComponent = useContext(
        CurrentEditedGridCellComponentContext
    )
    const [propsOptions, setPropsOptions] = useState<object | null>(null)

    useEffect(() => {
        if (currentEditedGridCellComponent?.component?.type === 'atoms') {
            const component = currentEditedGridCellComponent?.component

            if (component.name in atomRegistry) {
                setPropsOptions(atomRegistry[component.name].props)
            }
        }
    }, [currentEditedGridCellComponent?.component])

    const changeGridCellComponentProps = async (
        id: number,
        optionName: string,
        value: string
    ) => {
        if (currentEditedComponent?.component) {
            const updatedCurrentEditedComponent: Compound = Object.assign(
                {},
                currentEditedComponent?.component
            )
            if (currentEditedGridCell?.id != undefined) {
                if (
                    updatedCurrentEditedComponent.grid[
                        currentEditedGridCell?.id
                    ].components[id].type === 'atoms'
                ) {
                    const updatedComponent = updatedCurrentEditedComponent.grid[
                        currentEditedGridCell?.id
                    ].components[id] as Atom
                    updatedComponent.props[optionName] = value
                    updatedCurrentEditedComponent.grid[
                        currentEditedGridCell?.id
                    ].components[id] = updatedComponent as Atom
                }
            }

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

    const deleteGridCellComponent = async (id: number) => {
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

    interface option {
        name: string
        values: string[]
    }

    const renderOption = (option: option) => {
        let currentValue = ''
        if (currentEditedGridCellComponent?.component?.type === 'atoms') {
            for (const prop of Object.entries(
                currentEditedGridCellComponent?.component?.props
            )) {
                if (prop[0] === option.name) {
                    if (typeof prop[1] === 'string') {
                        currentValue = prop[1]
                    }
                }
            }
        }

        return (
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                    {option.name}
                </InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={currentValue}
                    label={option.name}
                    onChange={(event) =>
                        changeGridCellComponentProps(
                            currentEditedGridCellComponent?.id as number,
                            option.name,
                            event.target.value
                        )
                    }
                >
                    {option.values.map((value, index) => (
                        <MenuItem value={value} key={index}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    const renderOptions = () => {
        const options: option[] = []

        if (propsOptions) {
            for (const option of Object.entries(propsOptions)) {
                if (typeof option[1] === 'object') {
                    options.push({
                        name: option[0],
                        values: option[1],
                    })
                }
            }
        }

        return options.map((option, index) => (
            <React.Fragment key={index}>{renderOption(option)}</React.Fragment>
        ))
    }

    return (
        <>
            {currentEditedGridCellComponent?.component && (
                <>
                    <Typography variant='h6' component='h3'>
                        {currentEditedGridCellComponent?.component?.type ===
                        'atoms'
                            ? 'Atom Settings'
                            : 'Molecule Settings'}
                    </Typography>
                    <Typography variant='body1' component='p'>
                        Name: {currentEditedGridCellComponent?.component.name}
                    </Typography>

                    {renderOptions()}

                    <Divider />
                    <Button
                        variant='contained'
                        color='error'
                        endIcon={<DeleteIcon />}
                        onClick={() => {
                            if (
                                currentEditedGridCellComponent?.component !==
                                undefined
                            ) {
                                deleteGridCellComponent(
                                    currentEditedGridCellComponent?.id as number
                                )
                            }
                        }}
                    >
                        {currentEditedGridCellComponent?.component?.type ===
                        'atoms'
                            ? 'Delete Atom'
                            : 'Delete Molecule'}
                    </Button>
                </>
            )}
        </>
    )
}
