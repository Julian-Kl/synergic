interface VariableStringArrayProps {
    [key: string]: string[] | string
}

interface VariableStringProps {
    [key: string]: string
}

export interface Atom {
    name: string
    type: 'atoms'
    props: VariableStringArrayProps
    defaultProps: VariableStringArrayProps
    editableComponent: React.FC<any>
    component: React.FC<any>
}

export interface SavedAtom {
    name: string
    type: 'atoms'
    props: VariableStringProps
    defaultProps: VariableStringProps
}
