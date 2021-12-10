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
import { SelectedCompound } from '../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedGridCellComponent } from '../../../contexts/CompoundEditor/SelectedGridCellComponent'
import { updateCompoundGrid } from '../../../services/compounds/updateCompoundGrid'
import { Atom, VariablePropsOptions } from '../../../types/Atom'
import { Compound } from '../../../types/Compound'

export const CompoundLevelProps: React.FC = () => {
    const selectedCompound = useContext(SelectedCompound)
    const selectedGridCell = useContext(SelectedGridCell)
    const selectedGridCellComponent = useContext(
        SelectedGridCellComponent
    )
    const [propsOptions, setPropsOptions] = useState<VariablePropsOptions | null>(null)

    useEffect(() => {
        if (selectedGridCellComponent?.component?.type === 'atoms') {
            const component = selectedGridCellComponent?.component

            if (component.name in atomRegistry) {
                setPropsOptions(atomRegistry[component.name].propsOptions.compoundLevelProps)
            }
        }
        
        console.log(selectedGridCellComponent?.component)
    }, [selectedGridCellComponent?.component])

    const changeGridCellComponentProps = async (
        id: number,
        optionName: string,
        value: string
    ) => {
        if (selectedCompound?.compound) {
            const updatedCurrentEditedComponent: Compound = Object.assign(
                {},
                selectedCompound?.compound
            )
            if (selectedGridCell?.id != undefined) {
                if (
                    updatedCurrentEditedComponent.grid[
                        selectedGridCell?.id
                    ].components[id].type === 'atoms'
                ) {
                    const updatedComponent = updatedCurrentEditedComponent.grid[
                        selectedGridCell?.id
                    ].components[id] as Atom
                    updatedComponent.props[optionName] = value
                    updatedCurrentEditedComponent.grid[
                        selectedGridCell?.id
                    ].components[id] = updatedComponent as Atom
                }
            }

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

    const deleteGridCellComponent = async (id: number) => {
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

    interface option {
        name: string
        values: string[]
    }

    const renderOption = (option: option) => {
        let currentValue = ''
        if (selectedGridCellComponent?.component?.type === 'atoms') {
            for (const prop of Object.entries(
                selectedGridCellComponent?.component?.props
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
                            selectedGridCellComponent?.id as number,
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
            {selectedGridCellComponent?.component && (
                <>
                    <Typography variant='h6' component='h3'>
                        {selectedGridCellComponent?.component?.type ===
                        'atoms'
                            ? 'Atom Settings'
                            : 'Molecule Settings'}
                    </Typography>
                    <Typography variant='body1' component='p'>
                        Name: {selectedGridCellComponent?.component.name}
                    </Typography>

                    {renderOptions()}

                    <Divider />
                    <Button
                        variant='contained'
                        color='error'
                        endIcon={<DeleteIcon />}
                        onClick={() => {
                            if (
                                selectedGridCellComponent?.component !==
                                undefined
                            ) {
                                deleteGridCellComponent(
                                    selectedGridCellComponent?.id as number
                                )
                            }
                        }}
                    >
                        {selectedGridCellComponent?.component?.type ===
                        'atoms'
                            ? 'Delete Atom'
                            : 'Delete Molecule'}
                    </Button>
                </>
            )}
        </>
    )
}
