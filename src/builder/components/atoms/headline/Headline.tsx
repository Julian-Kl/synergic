import Typography from '@mui/material/Typography'
import * as React from 'react'

interface Props {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    text: string
}

export const Headline: React.FC<Props> = (props: Props) => {
    return (
        <Typography
            variant={props.variant}
            component={props.variant}
            gutterBottom
            style={{ color: 'darkblue'}}
        >
            {props.text}
        </Typography>
    )
}
