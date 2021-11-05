import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import { LoadingContext } from '../../../../contexts/LoadingContext'
import { useFetch } from '../../../../hooks/useFetch'
import { builderApiUrl } from '../../../../services/builderApiUrl'
import { Item } from '../Item/Item'

interface Props {
    components: 'molecules' | 'organisms'
}

interface ComponentData {
    name: string
}

export const BuilderComponentList: React.FC<Props> = (props: Props) => {
    const { data, loading } = useFetch(`${builderApiUrl}/${props.components}`)
    const loadingContext = useContext(LoadingContext)

    if(loadingContext != null) {
        if(loading) {
            loadingContext.setLoading(true)
        } else {
            loadingContext.setLoading(false)
        }
    }
    
    console.log(data)

    return (
        <>
            {data && data.map((component: ComponentData) => (
                <Grid key={component.name} item xs={2}>
                    <Item>{component.name}</Item>
                </Grid>
            ))}
        </>
    )
}