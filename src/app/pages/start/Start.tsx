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
            <p>Homepage</p>
            <img src={ExampleImage}></img>
            <p>Willkommen</p>
        </>
    )
}