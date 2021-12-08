export interface AtomProps {
    [key: string]: string
}

export interface AtomPropsOptions {
    compoundProps: {
        [key: string]: string[] | string
    }
    pageProps: {
        [key: string]: string[] | string
    }
}

export interface AtomRegister {
    name: string
    type: 'atoms'
    props: AtomProps
    propsOptions: AtomPropsOptions
    editableComponent: React.FC<any>
    component: React.FC<any>
}

export interface Atom {
    name: string
    type: 'atoms'
    props: AtomProps
}
