import React from 'react'
import { atomRegistry } from '../../../builder/components/atoms/atomRegistry'
import { structureAtom } from '../../types/PageData'

interface Props {
    component: structureAtom
}

export const PageAtomPreview: React.FC<Props> = (props: Props) => {
    const renderPreview = () => {
        const componentName = props.component.name
        if (componentName in atomRegistry) {
            const block = atomRegistry[componentName]
            return React.createElement(block.component, props.component.props)
        } else {
            console.log(`Component with name ${props.component.name} not found`)
        }
    }

    return <>{renderPreview()}</>
}
