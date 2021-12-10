import React, { useContext } from 'react'
import { atomRegistry } from '../../../../../resources/components/atoms/atomRegistry'
import { SelectedGridCellComponent } from '../../../../contexts/CompoundEditor/SelectedGridCellComponent'
import { Atom } from '../../../../types/Atom'
import {
    ActiveItemSecondary,
    DefaultItemSecondary
} from '../../../atoms/ItemSecondary/ItemSecondary'

interface Props {
    component: Atom
    selected?: boolean
    selectAble?: boolean
    id?: number
}

export const AtomPreview: React.FC<Props> = (props: Props) => {
    const selectedGridCellComponent = useContext(
        SelectedGridCellComponent
    )

    const selectAtom = () => {
        if (props.id !== undefined) {
            selectedGridCellComponent?.setComponent(props.component)
            selectedGridCellComponent?.setId(props.id)
        }
    }

    const renderPreview = () => {
        const componentName = props.component.name
        if (componentName in atomRegistry) {
            const block = atomRegistry[componentName]
            return React.createElement(block.component, props.component.props)
        } else {
            console.log(`Component with name ${props.component.name} not found`)
        }
    }

    if (props.selectAble) {
        if (
            props.selected &&
            selectedGridCellComponent?.id === props.id &&
            selectedGridCellComponent?.component?.type === 'atoms'
        ) {
            return <ActiveItemSecondary>{renderPreview()}</ActiveItemSecondary>
        } else {
            return (
                <DefaultItemSecondary onClick={() => selectAtom()}>
                    {renderPreview()}
                </DefaultItemSecondary>
            )
        }
    } else {
        return <>{renderPreview()}</>
    }
}
