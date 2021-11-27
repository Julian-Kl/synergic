import React from 'react'
import './paragraph.scss'

interface Props {
    text: string
}

export const Paragraph: React.FC<Props> = (props: Props) => {
    const classes = 'paragraph'

    return (
        <p className={classes}>
            {props.text}
        </p>
    )
}
