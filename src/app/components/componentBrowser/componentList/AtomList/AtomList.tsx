import { Grid } from '@mui/material'
import React from 'react'
import { atomRegistry } from '../../../../../builder/components/atoms/atomRegistry'
import { AtomicCompound } from '../../../../types/AtomicCompound'
import { AtomProps } from '../../../../types/AtomProps'
import { BrowserItem } from '../BrowserItem/BrowserItem'

interface Props {
    isAddAble: boolean
    addComponentToCell: (component: AtomProps | AtomicCompound) => void
}

export const AtomList: React.FC<Props> = (props: Props) => {
    return (
        <>
        
            {Object.keys(atomRegistry).map((key) => (
                <Grid key={atomRegistry[key].name} item xs={2}>
                    <BrowserItem
                        isAddAble={props.isAddAble}
                        addComponentToCell={props.addComponentToCell}
                        component={atomRegistry[key]}
                    >
                        {atomRegistry[key].name}
                    </BrowserItem>
                </Grid>
            ))}
        </>
    )
}
