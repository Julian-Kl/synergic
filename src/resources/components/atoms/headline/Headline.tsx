import React, { createElement, useState } from 'react'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import { AtomProps, AtomPropsOptions } from '../../../../editor/types/Atom'
import './headline.scss'

export const HeadlineDefaultProps: AtomProps = {
        variant: 'h1',
        element: 'h1',
        text: 'Lorem ipsum dolor sit amet'
}

export const HeadlinePropsOptions: AtomPropsOptions = {
    compoundLevelProps: {
        variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        element: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    pageLevelProps: {
        text: 'string'
    },
}

export interface HeadlineProps {
    variant: 'h1'| 'h2'| 'h3'| 'h4'| 'h5'| 'h6'
    element: 'h1'| 'h2'| 'h3'| 'h4'| 'h5'| 'h6'
    text: string
}


export const Headline: React.FC<HeadlineProps> = (props: HeadlineProps) => {
    return createElement(
        props.element,
        {className: `headline headline-${props.variant}`},
        props.text
    )
}

interface EditableHeadlineProps extends HeadlineProps {
    saveChanges: (value: string) => void
}

export const EditableHeadline: React.FC<EditableHeadlineProps> = (
    props: EditableHeadlineProps
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