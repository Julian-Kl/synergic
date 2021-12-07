import React, { useState } from 'react'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import './headline.scss'

interface Props {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    text: string
}

export const Headline: React.FC<Props> = (props: Props) => {
    const classes = `headline headline-${props.variant}`

    switch (props.element) {
        case 'h1':
            return <h1 className={classes}>{props.text}</h1>
        case 'h2':
            return <h2 className={classes}>{props.text}</h2>
        case 'h3':
            return <h3 className={classes}>{props.text}</h3>
        case 'h4':
            return <h4 className={classes}>{props.text}</h4>
        case 'h5':
            return <h5 className={classes}>{props.text}</h5>
        case 'h6':
            return <h6 className={classes}>{props.text}</h6>
        default:
            return <h1 className={classes}>{props.text}</h1>
    }
}

interface EditableProps extends Props {
    saveChanges: (value: string) => void
}

export const EditableHeadline: React.FC<EditableProps> = (
    props: EditableProps
) => {
    const [value, setValue] = useState(props.text)
    const classes = `headline headline-${props.variant} headline-editor`

    return (
        <>
            <textarea
                className={classes}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <SettingsPopup saveCanges={() => props.saveChanges(value)} />
        </>
    )
}