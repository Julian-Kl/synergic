import React from 'react'
import { CompoundGrid } from '../../../../../types/Compound'
import { ActiveItemPrimary, DefaultItemPrimary } from '../../../../atoms/ItemPrimary/ItemPrimary'
import { GridCellChildrenPreview } from '../GridCellChildrenPreview/GridCellChildrenPreview'

interface GridCellPreviewProps {
    selected?: boolean
    gridElement: CompoundGrid
}

export const GridCellPreview: React.FC<GridCellPreviewProps> = (props: GridCellPreviewProps) => {
    return props.selected ? (
        <ActiveItemPrimary>
            <GridCellChildrenPreview components={props.gridElement.components} selected={props.selected} />
        </ActiveItemPrimary>
    ) : (
        <DefaultItemPrimary>
            <GridCellChildrenPreview components={props.gridElement.components} />
        </DefaultItemPrimary>
    )
}
