export interface atomMetadata {
    name: string
    type: 'atoms'
    props: object
    defaultProps: object
    editableComponent: React.FC<any>
    component: React.FC<any>
}

interface Props {
    [key: string]: string
}

export interface savedAtomMetadata {
    name: string
    type: 'atoms'
    props: Props
    defaultProps: Props
}
