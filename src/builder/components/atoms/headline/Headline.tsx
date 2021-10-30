import * as React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    text: string
}

export const Headline: React.FC<Props> = (props: Props) => {
  return (
      <Typography variant={props.variant} component={props.variant} gutterBottom>
        {props.text}
      </Typography>
  );
}