import { atomMetadata } from '../../types/atomMetadata'
import { Headline } from './headline/Headline'
import { Paragraph } from './paragraph/Paragraph'

export const atomRegistry: atomMetadata[] = [
    {
        name: 'Headline',
        type: 'atoms',
        props: {
            variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            text: 'string',
        },
        component: Headline,
    },
    {
        name: 'Paragraph',
        type: 'atoms',
        props: {
            text: 'string',
        },
        component: Paragraph,
    },
]
