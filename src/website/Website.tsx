import { CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Route, Switch, useRouteMatch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { LoadingBackdrop } from '../editor/components/atoms/LoadingBackdrop/LoadingBackdrop'
import { getPages } from '../editor/services/pages/getPages'
import { Page } from '../editor/types/Page'
import { PageRender } from './pageRender/PageRender'

export const Website: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const { path } = useRouteMatch()

    const loadData = async () => {
        const response = await getPages()
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
                                    content='This is the Page'
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
