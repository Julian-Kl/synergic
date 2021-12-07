import React, { useState } from 'react'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import './paragraph.scss'

interface Props {
    text: string
}

export const Paragraph: React.FC<Props> = (props: Props) => {
    const classes = 'paragraph'

    return <p className={classes}>{props.text}</p>
}

interface EditableProps extends Props {
    saveChanges: (value: string) => void
}

export const EditableParagraph: React.FC<EditableProps> = (
    props: EditableProps
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
