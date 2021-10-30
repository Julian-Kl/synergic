import { Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import ExampleImage from '../../assets/images/ExampleImage.png'

export const Start: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name='description' content='This is Home' />
            </Helmet>
            <Typography
                variant='h1'
                component='h1'
                gutterBottom
            >
                Synergic
            </Typography>
            <Typography
                variant='h2'
                component='h2'
                gutterBottom
            >
                Atomic Design Page Builder
            </Typography>
        </>
    )
}
