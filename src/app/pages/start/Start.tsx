import { Grow, Typography } from '@mui/material'
import ParticlesBg from 'particles-bg'
import React from 'react'
import { Helmet } from 'react-helmet-async'

export const Start: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Synergic</title>
                <meta name='description' content='This is Home' />
            </Helmet>
            <ParticlesBg type='cobweb' color='#1976d2' bg />
            <div style={{ position: 'absolute', top: 200, left: 80 }}>
                <Grow in {...{ timeout: 1000 }}>
                    <Typography variant='h1' component='h1'>
                        Synergic
                    </Typography>
                </Grow>
                <Grow in {...{ timeout: 2000 }}>
                    <Typography variant='h2' component='h2'>
                        Atomic Design Page Builder
                    </Typography>
                </Grow>
            </div>
        </>
    )
}
