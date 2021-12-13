import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import { AtomProps, AtomPropsOptions } from '../../../../editor/types/Atom'
import './link.scss'

export const LinkDefaultProps: AtomProps = {
    text: 'Link',
    link: '#'
}

export const LinkPropsOptions: AtomPropsOptions = {
    compoundLevelProps: {},
    pageLevelProps: {
        text: 'string',
        link: 'string',
    },
}

interface LinkProps {
    text: string
    link: string
}

export const Link: React.FC<LinkProps> = (props: LinkProps) => {
    const classes = 'link'

    return <RouterLink className={classes} to={props.link}>{props.text}</RouterLink>
}

interface EditableLinkProps extends LinkProps {
    saveChanges: (value: string) => void
}

export const EditableLink: React.FC<EditableLinkProps> = (
    props: EditableLinkProps
) => {
    const [value, setValue] = useState(props.text)
    const classes = 'link link-editor'

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
