import { Skeleton } from '@mui/material'
import React from 'react'
import { atomMetadata } from '../../../../../../builder/types/atomMetadata'
import { ComponentData } from '../../../../../types/ComponentData'

interface Props {
    components: (atomMetadata | ComponentData)[]
}

export const GridCellChildren: React.FC<Props> = (props: Props) => {
    if (props.components.length > 0) {
        return (
            <>
                {props.components.map((component, index) => {
                    let element: atomMetadata | ComponentData
    
                    if (component.type === 'atoms') {
                        element = component as atomMetadata
    
                        return <div key={index}>{element.name}</div>

                        
                    } else {
                        element = component as ComponentData
    
                        return <div key={index}>{element.name}</div>
                    }
                })}
            </>
        )
    } else {
        return (
            <Skeleton variant="text" animation={false} />
        )
    }
}
