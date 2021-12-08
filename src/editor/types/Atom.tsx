export interface AtomProps {
    [key: string]: string
}

export interface AtomPropsOptions {
    compoundLevelProps: {
        [key: string]: string[] | string
    }
    pageLevelProps: {
        [key: string]: string[] | string
    }
}

export interface Atom {
    name: string
    type: 'atoms'
    props: AtomProps
}

export interface AtomEntry extends Atom {
    propsOptions: AtomPropsOptions
    editableComponent: React.FC<any>
    component: React.FC<any>
}
