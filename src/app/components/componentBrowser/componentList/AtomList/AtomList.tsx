import { Grid } from '@mui/material'
import { atomRegistry } from '../../../../../builder/components/atoms/atomRegistry'
import React from 'react'
import { BrowserItem } from '../BrowserItem/BrowserItem'
import { atomMetadata } from '../../../../../builder/types/atomMetadata'
import { ComponentData } from '../../../../types/ComponentData'

interface Props {
    isAddAble: boolean
    addComponentToCell: (component: atomMetadata | ComponentData) => void
}

export const AtomList: React.FC<Props> = (props: Props) => {
    return (
        <>
            {atomRegistry.map((component) => (
                <Grid key={component.name} item xs={2}>
                    <BrowserItem
                        isAddAble={props.isAddAble}
                        addComponentToCell={props.addComponentToCell}
                        component={component}
                    >
                        {component.name}
                    </BrowserItem>
                </Grid>
            ))}
        </>
    )
}
