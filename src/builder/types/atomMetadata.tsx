import React from 'react'

export interface atomMetadata {
    name: string
    type: 'atoms'
    // eslint-disable-next-line @typescript-eslint/ban-types
    props: object
    // eslint-disable-next-line @typescript-eslint/ban-types
    defaultProps: object
    component: React.FC<any>
}
