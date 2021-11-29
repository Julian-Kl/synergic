import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedComponentContext } from '../../../../contexts/CurrentEditedComponentContext'
import { CurrentEditedGridCellContext } from '../../../../contexts/CurrentEditedGridCell'
import { CurrentEditedGridCellComponentContext } from '../../../../contexts/CurrentEditedGridCellComponent'
import { builderApiUrl } from '../../../../services/builderApiUrl'
import { fetchApi } from '../../../../services/fetchApi'
import { atomMetadata } from '../../../../types/atomMetadata'
import { ComponentData } from '../../../../types/ComponentData'
import { AddComponent } from '../../../atoms/AddComponent/AddComponent'
import { LoadingBackdrop } from '../../../atoms/LoadingBackdrop/LoadingBackdrop'
import { BrowserItem } from '../BrowserItem/BrowserItem'

interface Props {
    components: 'molecules' | 'organisms'
    isAddAble: boolean
    addComponentToCell: (component: atomMetadata | ComponentData) => void
    isCreateable: boolean | undefined
}

export const BuilderComponentList: React.FC<Props> = (props: Props) => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
    const currentEditedGridCell = useContext(CurrentEditedGridCellContext)
    const currentEditedGridCellComponent = useContext(
        CurrentEditedGridCellComponentContext
    )
    const [data, setData] = useState<ComponentData[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${builderApiUrl}/${props.components}`)
        setData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const createComponent = async (name: string) => {
        if (name) {
            const response = await fetchApi(
                `${builderApiUrl}/${props.components}`,
                'POST',
                {
                    name: name,
                    settings: [],
                    grid: [],
                }
            )
            data.push(response.data)
            setData([...data])
        }
    }

    const deleteComponent = async (id: number) => {
        if (id) {
            const response = await fetchApi(
                `${builderApiUrl}/${props.components}/${id}`,
                'DELETE'
            )

            const updatedData: ComponentData[] = data.filter(function (value) {
                return value.id != response.data.id
            })

            setData([...updatedData])
            currentEditedComponent?.setComponent(null)
            currentEditedGridCellComponent?.setComponent(null)
            currentEditedGridCellComponent?.setId(null)
        }
    }

    const selectComponent = (component: ComponentData) => {
        currentEditedComponent?.setComponent(component)
        currentEditedGridCell?.setComponent(null)
        currentEditedGridCell?.setId(null)
        currentEditedGridCellComponent?.setComponent(null)
        currentEditedGridCellComponent?.setId(null)
    }

    const isSelected = (component: ComponentData) => {
        return (
            component.id === currentEditedComponent?.component?.id &&
            component.type === currentEditedComponent?.component?.type
        )
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            {data &&
                data.map((component: ComponentData, index) => (
                    <Grid
                        key={component.id}
                        item
                        xs={2}
                        onClick={() => selectComponent(component)}
                    >
                        <BrowserItem
                            selected={isSelected(component)}
                            deleteComponent={deleteComponent}
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
                    createComponent={createComponent}
                />
            )}
        </>
    )
}
