import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetData, HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom'
import { Editor } from './editor/Editor'
import { html } from './editor/index'

type helmetContext = Record<string, never> | { helmet: HelmetData }

const port = 80
const server = express()

server.use(express.static('public'))

server.get('*', (req, res) => {

    const helmetContext: helmetContext = {}

    const body = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={req.url}>
                <Editor />
            </StaticRouter>
        </HelmetProvider>
    )

    res.send(html(helmetContext.helmet, body))
})

server.listen(port, () => console.log(`App listening on port ${port}!`))
