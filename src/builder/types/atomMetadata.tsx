export interface atomMetadata {
    name: string
    type: 'atoms'
    // eslint-disable-next-line @typescript-eslint/ban-types
    props: object
    component: React.ReactNode
}