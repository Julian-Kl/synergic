import { Grid } from '@mui/material'
import React from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { builderApiUrl } from '../../../../services/builderApiUrl'
import { Item } from '../Item/Item'
import { LoadingBackdrop } from '../../../atoms/LoadingBackdrop/LoadingBackdrop'

interface Props {
    components: 'molecules' | 'organisms'
}

interface ComponentData {
    name: string
    id: number
}

export const BuilderComponentList: React.FC<Props> = (props: Props) => {
    const { data, loading } = useFetch(`${builderApiUrl}/${props.components}`)

    console.log(data)

    return (
        <>
            {loading && <LoadingBackdrop />}
            {data &&
                data.map((component: ComponentData) => (
                    <Grid key={component.id} item xs={2}>
                        <Item>{component.name}</Item>
                    </Grid>
                ))}
        </>
    )
}
