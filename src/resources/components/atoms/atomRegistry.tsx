import { AtomRegister } from '../../../editor/types/Atom'
import { EditableHeadline, Headline, HeadlineDefaultProps, HeadlinePropsOptions } from './headline/Headline'

export interface AtomRegistry {
    [key: string]: AtomRegister
}

export const atomRegistry: AtomRegistry = {
    'Headline': {
        name: 'Headline',
        type: 'atoms',
        props: HeadlineDefaultProps,
        propsOptions: HeadlinePropsOptions,
        component: Headline,
        editableComponent: EditableHeadline
    },
    /*
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
    */
}
