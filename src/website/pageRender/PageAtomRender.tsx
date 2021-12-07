import React from 'react'
import { PageAtom } from '../../editor/types/Page'
import { atomRegistry } from '../../resources/components/atoms/atomRegistry'

interface Props {
    atom: PageAtom
}

export const PageAtomRender: React.FC<Props> = (props: Props) => {
    const componentName = props.atom.name
    if (componentName in atomRegistry) {
        const block = atomRegistry[componentName]
        return React.createElement(block.component, props.atom.props)
    } else {
        console.log(`Component with name ${props.atom.name} not found`)
        return <></>
    }
}