import React, { useState } from 'react'
import { SettingsPopup } from '../../../../editor/components/PagePreview/SaveSettingsPopup'
import { AtomProps, AtomPropsOptions } from '../../../../editor/types/Atom'
import './image.scss'

export const ImageDefaultProps: AtomProps = {
        link: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
}

export const ImagePropsOptions: AtomPropsOptions = {
    compoundLevelProps: {},
    pageLevelProps: {
        link: 'string'
    },
}

export interface ImageProps {
    link: string
}


export const Image: React.FC<ImageProps> = (props: ImageProps) => {
    return (
        <img className='image' src={props.link} width='100%' height='100%'></img>
    )
}

interface EditableImageProps extends ImageProps {
    saveChanges: (value: string) => void
}

export const EditableImage: React.FC<EditableImageProps> = (
    props: EditableImageProps
) => {
    const [value, setValue] = useState(props.link)

    return (
        <>
            <textarea
                className='image'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <SettingsPopup saveCanges={() => props.saveChanges(value)} />
        </>
    )
}