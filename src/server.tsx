import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { html } from './app/index'
import { App } from './app/App'
import { HelmetProvider, HelmetData } from 'react-helmet-async'

type helmetContext = Record<string, never> | { helmet: HelmetData }

const port = 80
const server = express()

server.use(express.static('public'))

server.get('*', (req, res) => {

    const helmetContext: helmetContext = {}

    const body = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </HelmetProvider>
    )

    res.send(html(helmetContext.helmet, body))
})

server.listen(port, () => console.log(`App listening on port ${port}!`))
