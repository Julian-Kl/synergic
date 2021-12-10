import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { LoadingBackdrop } from '../../editor/components/atoms/LoadingBackdrop/LoadingBackdrop'
import { getPages } from '../../editor/services/pages/getPages'
import { Page } from '../../editor/types/Page'
import { PageRender } from '../pageRender/PageRender'
import { RouterNavigation } from './RouterNavigation'

export const Router: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const [pageName, setPageName] = React.useState('')

    const loadData = async () => {
        const response = await getPages();
        setPages(response.data)
        setLoading(false)
    }

    const loadPageName = () => {
        pages.forEach((page) => {
            if (`${url}/${page.route}` === location.pathname) {
                setPageName(page.name)
            }
        })
    }

    useEffect(() => {
        loadData()
        loadPageName()
    }, [])

    return (
        
        <BrowserRouter>
        {loading && <LoadingBackdrop />}
            <RouterNavigation 
                pageName={pageName}
                setPageName= {setPageName}
                pages={pages}
                url={url}
            />
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
    )
}
