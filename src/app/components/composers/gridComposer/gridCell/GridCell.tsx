import { Paper, styled } from '@mui/material'
import React from 'react'
import { ComponentGrid } from '../../../../types/ComponentData'
import { GridCellChildren } from './gridCellChildren/GridCellChildren'

export const DefaultItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    ':hover': {
        border: 'solid 1px rgba(25,118,210, .5)',
    },
    border: 'solid 1px rgba(25,118,210, .2)',
    borderRadius: 0,
}))

export const ActiveItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px rgba(25,118,210, 1)',
    borderRadius: 0,
}))

interface Props {
    selected?: boolean
    gridElement: ComponentGrid
}

export const GridCell: React.FC<Props> = (props: Props) => {
    return props.selected ? (
        <ActiveItem>
            <GridCellChildren components={props.gridElement.components} />
        </ActiveItem>
    ) : (
        <DefaultItem>
            <GridCellChildren components={props.gridElement.components} />
        </DefaultItem>
    )
}
