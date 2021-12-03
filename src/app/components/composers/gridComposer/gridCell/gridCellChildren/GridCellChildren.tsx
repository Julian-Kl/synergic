import { Skeleton } from '@mui/material'
import React from 'react'
import { atomProps } from '../../../../../types/atomProps'
import { ComponentData } from '../../../../../types/ComponentData'
import { AtomPreview } from '../../../../builderComponents/atomPreview/AtomPreview'
import { MoleculePreview } from '../../../../builderComponents/moleculesPreview/MoleculePreview'

interface Props {
    components: (atomProps | ComponentData)[]
    selected?: boolean
}

export const GridCellChildren: React.FC<Props> = (props: Props) => {
    if (props.components.length > 0) {
        return (
            <>
                {props.components.map((component, index) => {
                    if (component.type === 'atoms') {
                        return (
                            <AtomPreview
                                key={index}
                                component={component as atomProps}
                                selected={props.selected}
                                selectAble={true}
                                id={index}
                            />
                        )
                    } else {
                        return (
                            <MoleculePreview
                                key={index}
                                selected={props.selected}
                                component={component as ComponentData}
                                selectAble={true}
                                id={index}
                            />
                        )
                    }
                })}
            </>
        )
    } else {
        return <Skeleton variant='text' animation={false} />
    }
}
