import React from 'react'
import { PageAtom as PageAtomType } from '../../app/types/Page'
import { atomRegistry } from '../../builder/components/atoms/atomRegistry'

interface Props {
    component: PageAtomType
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