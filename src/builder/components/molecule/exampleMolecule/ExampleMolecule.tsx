import * as React from 'react'

interface Props {
    children: React.ReactNode
}

export const ExampleMolecule: React.FC<Props> = (props: Props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}
