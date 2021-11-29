import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import { contentApiUrl } from '../../app/services/contentApiUrl'
import { fetchApi } from '../../app/services/fetchApi'
import { PageData } from '../../app/types/PageData'
import { Page } from '../pageRender/Page'

export const PageRouter: React.FC = () => {
    const [pages, setPages] = useState<PageData[]>([])
    const [loading, setLoading] = useState(true)
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const [pageName, setPageName] = React.useState('')

    const loadData = async () => {
        const response = await fetchApi(`${contentApiUrl}/pages`)
        setPages(response.data)
        setLoading(false)
    }

    const loadPageName = () => {
        pages.forEach((page) => {
            console.log(page.route)
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
            <Box sx={{ width: '100%', backgroundColor: 'lightgray' }}>
                <Box sx={{ maxWidth: 240, marginLeft: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Page
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={pageName}
                            label='Page'
                            onChange={(e) => setPageName(e.target.value)}
                        >
                            {pages.map(({ name, route }, key) => (
                                <MenuItem
                                    value={name}
                                    key={key}
                                    style={{ padding: 0 }}
                                >
                                    <Link
                                        to={`${url}/${route}`}
                                        style={{
                                            width: '100%',
                                            padding: '6px 16px 6px 16px',
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            component='span'
                                        >
                                            {name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

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
                        <Page page={page} />
                    </Route>
                ))}
            </Switch>
        </BrowserRouter>
    )
}
