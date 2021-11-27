import React from 'react'
import { ComponentGrid } from '../../../../types/ComponentData'
import { ActiveItemPrimary, DefaultItemPrimary } from '../../../atoms/ItemPrimary/ItemPrimary'
import { GridCellChildren } from './gridCellChildren/GridCellChildren'

interface GridCellProps {
    selected?: boolean
    gridElement: ComponentGrid
}

export const GridCell: React.FC<GridCellProps> = (props: GridCellProps) => {
    return props.selected ? (
        <ActiveItemPrimary>
            <GridCellChildren components={props.gridElement.components} selected={props.selected} />
        </ActiveItemPrimary>
    ) : (
        <DefaultItemPrimary>
            <GridCellChildren components={props.gridElement.components} />
        </DefaultItemPrimary>
    )
}
