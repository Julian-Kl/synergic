import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedCompound } from '../../../../contexts/CompoundEditor/SelectedCompound'
import { SelectedGridCell } from '../../../../contexts/CompoundEditor/SelectedGridCell'
import { SelectedGridCellChild } from '../../../../contexts/CompoundEditor/SelectedGridCellChild'
import { createCompound } from '../../../../services/compounds/createCompound'
import { deleteCompound } from '../../../../services/compounds/deleteCompound'
import { getCompounds } from '../../../../services/compounds/getCompounds'
import { Atom } from '../../../../types/Atom'
import { Compound } from '../../../../types/Compound'
import { AddComponent } from '../../../atoms/AddComponent/AddComponent'
import { LoadingBackdrop } from '../../../atoms/LoadingBackdrop/LoadingBackdrop'
import { BrowserItem } from '../BrowserItem/BrowserItem'

interface Props {
    components: 'molecules' | 'organisms'
    isAddAble: boolean
    addComponentToCell: (component: Atom | Compound) => void
    isCreateable: boolean | undefined
}

export const CompoundList: React.FC<Props> = (props: Props) => {
    const selectedCompound = useContext(SelectedCompound)
    const selectedGridCell = useContext(SelectedGridCell)
    const selectedGridCellChild = useContext(
        SelectedGridCellChild
    )
    const [compounds, setCompounds] = useState<Compound[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await getCompounds(props.components)
        setCompounds(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const addCompound = async (name: string) => {
        const response  = await createCompound(name, props.components)
        compounds.push(response.data)
        setCompounds([...compounds])
    }

    const removeCompound = async (id: number) => {
        const response = await deleteCompound(id, props.components)
        const updatedCompounds: Compound[] = compounds.filter(function (value) {
            return value.id != response.data.id
        })
        setCompounds([...updatedCompounds])
        selectedCompound?.setCompound(null)
        selectedGridCellChild?.setChild(null)
        selectedGridCellChild?.setId(null)
    }

    const selectComponent = (component: Compound) => {
        selectedCompound?.setCompound(component)
        selectedGridCell?.setGridCell(null)
        selectedGridCell?.setId(null)
        selectedGridCellChild?.setChild(null)
        selectedGridCellChild?.setId(null)
    }

    const isSelected = (component: Compound) => {
        return (
            component.id === selectedCompound?.compound?.id &&
            component.type === selectedCompound?.compound?.type
        )
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            {compounds &&
                compounds.map((component: Compound, index) => (
                    <Grid
                        key={component.id}
                        item
                        xs={2}
                        onClick={() => selectComponent(component)}
                    >
                        <BrowserItem
                            selected={isSelected(component)}
                            deleteComponent={removeCompound}
                            index={index}
                            id={component.id}
                            isAddAble={
                                props.isAddAble && !isSelected(component)
                            }
                            addComponentToCell={props.addComponentToCell}
                            component={component}
                        >
                            {component.name}
                        </BrowserItem>
                    </Grid>
                ))}
            {props.isCreateable && (
                <AddComponent
                    components={props.components}
                    createComponent={addCompound}
                />
            )}
        </>
    )
}
