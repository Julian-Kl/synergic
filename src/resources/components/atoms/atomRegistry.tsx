import { Atom } from '../../../editor/types/Atom'
import { EditableHeadline, Headline } from './headline/Headline'
import { EditableParagraph, Paragraph } from './paragraph/Paragraph'

export interface AtomRegistry {
    [key: string]: Atom
}

export const atomRegistry: AtomRegistry = {
    'Headline': {
        name: 'Headline',
        type: 'atoms',
        props: {
            variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            text: 'string',
        },
        defaultProps: {
            variant: 'h1',
            element: 'h1',
            text: 'Lorem ipsum dolor sit amet',
        },
        component: Headline,
        editableComponent: EditableHeadline
    },
    'Paragraph': {
        name: 'Paragraph',
        type: 'atoms',
        props: {
            text: 'string',
        },
        defaultProps: {
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        },
        component: Paragraph,
        editableComponent: EditableParagraph
    },
}