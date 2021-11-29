import React from 'react'
import { structureAtom } from '../../app/types/PageData'
import { atomRegistry } from '../../builder/components/atoms/atomRegistry'

interface Props {
    component: structureAtom
}

export const PageAtom: React.FC<Props> = (props: Props) => {
    const componentName = props.component.name
    if (componentName in atomRegistry) {
        const block = atomRegistry[componentName]
        return React.createElement(block.component, props.component.props)
    } else {
        console.log(`Component with name ${props.component.name} not found`)
        return <div>Error: {`Component with name ${props.component.name} not found`}</div>
    }
}