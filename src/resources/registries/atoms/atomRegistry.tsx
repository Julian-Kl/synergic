import { AtomEntry } from '../../../editor/types/Atom'
import { EditableHeadline, Headline, HeadlineDefaultProps, HeadlinePropsOptions } from '../../components/atoms/headline/Headline'
import { EditableImage, Image, ImageDefaultProps, ImagePropsOptions } from '../../components/atoms/image/Image'
import { EditableLink, Link, LinkDefaultProps, LinkPropsOptions } from '../../components/atoms/link/Link'
import { EditableParagraph, Paragraph, ParagraphDefaultProps, ParagraphPropsOptions } from '../../components/atoms/paragraph/Paragraph'
import { EditableSeparator, Separator, SeparatorDefaultProps, SeparatorPropsOptions } from '../../components/atoms/separator/Separator'

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
    'Link': {
        name: 'Link',
        type: type,
        props: LinkDefaultProps,
        propsOptions: LinkPropsOptions,
        component: Link,
        editableComponent: EditableLink
    },
    'Image': {
        name: 'Image',
        type: type,
        props: ImageDefaultProps,
        propsOptions: ImagePropsOptions,
        component: Image,
        editableComponent: EditableImage
    },
    'Separator': {
        name: 'Separator',
        type: type,
        props: SeparatorDefaultProps,
        propsOptions: SeparatorPropsOptions,
        component: Separator,
        editableComponent: EditableSeparator
    },
}
