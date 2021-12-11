export interface AtomProps {
    [key: string]: string
}

export interface VariablePropsOptions {
    readonly [key: string]: readonly string[] | string
}

export interface AtomPropsOptions {
    readonly compoundLevelProps: VariablePropsOptions
    readonly pageLevelProps: VariablePropsOptions
}

export interface Atom {
    readonly name: string
    readonly type: 'atoms'
    props: AtomProps
}

export interface AtomEntry extends Atom {
    propsOptions: AtomPropsOptions
    readonly editableComponent: React.FC<any>
    readonly component: React.FC<any>
}