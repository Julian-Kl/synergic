import React from 'react'
import { Helmet } from 'react-helmet-async'
import ExampleImage from '../../assets/images/ExampleImage.png'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'solid 1px darkblue'
  }));

export const Start: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name='description' content='This is Home' />
            </Helmet>
            <p>Homepage</p>
            <img src={ExampleImage}></img>
            <p>Willkommen</p>
            <div style={{ maxWidth: 500}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>
            </div>
        </>
    )
}
