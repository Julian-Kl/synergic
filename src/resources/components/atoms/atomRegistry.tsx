import { AtomEntry } from '../../../editor/types/Atom'
import { EditableHeadline, Headline, HeadlineDefaultProps, HeadlinePropsOptions } from './headline/Headline'
import { EditableParagraph, Paragraph, ParagraphDefaultProps, ParagraphPropsOptions } from './paragraph/Paragraph'

export interface AtomRegistry {
    [key: string]: AtomEntry
}

const type = 'atoms'

export const atomRegistry: AtomRegistry = {
    'Headline': {
        name: 'Headline',
        type: type,
        props: HeadlineDefaultProps,
        propsOptions: HeadlinePropsOptions,
        component: Headline,
        editableComponent: EditableHeadline
    },
    'Paragraph': {
        name: 'Paragraph',
        type: type,
        props: ParagraphDefaultProps,
        propsOptions: ParagraphPropsOptions,
        component: Paragraph,
        editableComponent: EditableParagraph
    },
}
