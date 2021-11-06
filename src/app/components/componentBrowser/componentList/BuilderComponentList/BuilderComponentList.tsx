import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { builderApiUrl } from '../../../../services/builderApiUrl'
import { Item } from '../Item/Item'
import { LoadingBackdrop } from '../../../atoms/LoadingBackdrop/LoadingBackdrop'
import { AddComponent } from '../../../atoms/AddComponent/AddComponent'
import { fetchApi } from '../../../../services/fetchApi'
import { ComponentData } from '../../../../types/ComponentData'
import { CurrentEditedComponentContext } from '../../../../contexts/CurrentEditedComponentContext'

interface Props {
    components: 'molecules' | 'organisms'
}

export const BuilderComponentList: React.FC<Props> = (props: Props) => {
    const currentEditedComponent = useContext(CurrentEditedComponentContext)
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
                }
            )
            data.push(response.data)
            setData([...data])
        }
    }

    const selectComponent = (component: ComponentData) => {
        currentEditedComponent?.setComponent(component)
    }

    const isSelected = (component: ComponentData) => {
        return component === currentEditedComponent?.component
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            {data &&
                data.map((component: ComponentData) => (
                    <Grid
                        key={component.id}
                        item
                        xs={2}
                        onClick={() => selectComponent(component)}
                    >
                        <Item selected={isSelected(component)}>{component.name}</Item>
                    </Grid>
                ))}
            <AddComponent
                components={props.components}
                createComponent={createComponent}
            />
        </>
    )
}
