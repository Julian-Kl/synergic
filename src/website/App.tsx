import { CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Route, Switch, useRouteMatch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { LoadingBackdrop } from '../app/components/atoms/LoadingBackdrop/LoadingBackdrop'
import { contentApiUrl } from '../app/services/contentApiUrl'
import { fetchApi } from '../app/services/fetchApi'
import { Page } from '../app/types/Page'
import { PageRender } from './pageRender/PageRender'

export const App: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const { path, url } = useRouteMatch()

    const loadData = async () => {
        const response = await fetchApi(`${contentApiUrl}/pages`)
        setPages(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <HelmetProvider>
            <CssBaseline />
            <BrowserRouter>
                {loading && <LoadingBackdrop />}
                <Switch>
                    {pages.map((page, key) => (
                        <Route key={key} path={`${path}/${page.route}`} exact>
                            <Helmet>
                                <title>{page.title}</title>
                                <meta
                                    name='description'
                                    content='This is the Page Editor'
                                />
                            </Helmet>
                            <PageRender page={page} />
                        </Route>
                    ))}
                </Switch>
            </BrowserRouter>
        </HelmetProvider>
    )
}
