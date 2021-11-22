import React from 'react'
import { atomRegistry } from '../../../../builder/components/atoms/atomRegistry'
import { atomMetadata } from '../../../../builder/types/atomMetadata'

interface Props {
    component: atomMetadata
}

export const AtomPreview: React.FC<Props> = (props: Props) => {
    const renderPreview = () => {
        const componentName = props.component.name
        if (componentName in atomRegistry) {
            const block = atomRegistry[componentName]
            return React.createElement(block.component, block.defaultProps)
        } else {
            console.log(`Component with name ${props.component.name} not found`)
        }
    }

    return <>{renderPreview()}</>
}
