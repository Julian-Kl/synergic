import React, { useState } from 'react'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import { AtomProps, AtomPropsOptions } from '../../../../editor/types/Atom'
import './paragraph.scss'

export const ParagraphDefaultProps: AtomProps = {
    text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
}

export const ParagraphPropsOptions: AtomPropsOptions = {
    compoundLevelProps: {},
    pageLevelProps: {
        text: 'string',
    },
}

interface ParagraphProps {
    text: string
}

export const Paragraph: React.FC<ParagraphProps> = (props: ParagraphProps) => {
    const classes = 'paragraph'

    return <p className={classes}>{props.text}</p>
}

interface EditableParagraphProps extends ParagraphProps {
    saveChanges: (value: string) => void
}

export const EditableParagraph: React.FC<EditableParagraphProps> = (
    props: EditableParagraphProps
) => {
    const [value, setValue] = useState(props.text)
    const classes = 'paragraph paragraph-editor'

    return (
        <>
            <textarea
                className={classes}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={10}
            ></textarea>
            <SettingsPopup saveCanges={() => props.saveChanges(value)} />
        </>
    )
}
