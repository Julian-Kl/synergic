import React, { useContext } from 'react'
import { atomRegistry } from '../../../../builder/components/atoms/atomRegistry'
import { CurrentEditedGridCellComponentContext } from '../../../contexts/CurrentEditedGridCellComponent'
import { AtomProps } from '../../../types/AtomProps'
import { ActiveItemSecondary, DefaultItemSecondary } from "../../atoms/ItemSecondary/ItemSecondary"

interface Props {
    component: AtomProps
    selected?: boolean
    selectAble?: boolean
    id?: number
}

export const AtomPreview: React.FC<Props> = (props: Props) => {
    const currentEditedGridCellComponentContext = useContext(
        CurrentEditedGridCellComponentContext
    )

    const selectAtom = () => {
        if (props.id !== undefined) {
            currentEditedGridCellComponentContext?.setComponent(props.component)
            currentEditedGridCellComponentContext?.setId(props.id)
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
            currentEditedGridCellComponentContext?.id === props.id &&
            currentEditedGridCellComponentContext?.component?.type === 'atoms'
        ) {
            return (
                <ActiveItemSecondary>
                    {renderPreview()}
                </ActiveItemSecondary>
            )
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
