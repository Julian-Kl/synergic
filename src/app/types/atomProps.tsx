interface variableStringArrayProps {
    [key: string]: string[] | string
}

interface variableStringProps {
    [key: string]: string
}

export interface atomProps {
    name: string
    type: 'atoms'
    props: variableStringArrayProps
    defaultProps: variableStringArrayProps
    editableComponent: React.FC<any>
    component: React.FC<any>
}

export interface pageAtomProps {
    name: string
    type: 'atoms'
    props: variableStringProps
    defaultProps: variableStringProps
}
