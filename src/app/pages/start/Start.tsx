import { Grow, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Background } from '../../components/atoms/Background/Background'

export const Start: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Synergic</title>
                <meta name='description' content='This is Home' />
            </Helmet>
            <Background />
            <div style={{ position: 'absolute', top: 200, left: 80 }}>
                <Grow in {...{ timeout: 1500 }}>
                    <Typography variant='h1' component='h1'>
                        Synergic
                    </Typography>
                </Grow>
                <Grow in {...{ timeout: 1800 }}>
                    <Typography variant='h2' component='h2' color='primary'>
                        Atomic Design Page Builder
                    </Typography>
                </Grow>
                <Grow in {...{ timeout: 2600 }}>
                    <Typography variant='h5' component='p'>
                        Bachelorthesis Project by Julian Klummer
                    </Typography>
                </Grow>
            </div>
        </>
    )
}
