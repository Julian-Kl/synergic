interface VariableStringArrayProps {
    [key: string]: string[] | string
}

interface VariableStringProps {
    [key: string]: string
}

export interface AtomProps {
    name: string
    type: 'atoms'
    props: VariableStringArrayProps
    defaultProps: VariableStringArrayProps
    editableComponent: React.FC<any>
    component: React.FC<any>
}

export interface PageAtomProps {
    name: string
    type: 'atoms'
    props: VariableStringProps
    defaultProps: VariableStringProps
}
