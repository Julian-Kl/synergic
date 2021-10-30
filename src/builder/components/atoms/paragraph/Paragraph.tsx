import * as React from 'react'
import Typography from '@mui/material/Typography'

interface Props {
    text: string
}

export const Paragraph: React.FC<Props> = (props: Props) => {
    return (
        <Typography variant='body1' gutterBottom>
            {props.text}
        </Typography>
    )
}
