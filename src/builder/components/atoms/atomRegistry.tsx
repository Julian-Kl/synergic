import { componentMetadata } from '../../types/componentMetadata'
import { Headline } from './headline/Headline'
import { Paragraph } from './paragraph/Paragraph'

export const atomRegistry: componentMetadata[] = [
    {
        name: 'Headline',
        props: {
            variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            text: 'string',
        },
        component: Headline,
    },
    {
        name: 'Paragraph',
        props: {
            text: 'string',
        },
        component: Paragraph,
    },
]
