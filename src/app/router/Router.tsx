import React, { useContext } from 'react'
import routes from './routes'
import { Route, Switch } from 'react-router-dom'
import { NoMatch } from '../pages/404/NoMatch'
import { Navbar } from '../components/navbar/Navbar'
import { LoadingContext } from '../contexts/LoadingContext'
import { Backdrop, CircularProgress } from '@mui/material'

export const Router: React.FC = () => {
    const loadingContext = useContext(LoadingContext)

    return (
        <>
            {loadingContext && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loadingContext?.loading}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            )}
            <Navbar routes={routes} />
            <Switch>
                {routes.map(({ path, exact, component }, key) => (
                    <Route key={key} path={path} exact={exact}>
                        {component}
                    </Route>
                ))}
                <Route key='404' render={() => <NoMatch />} />
            </Switch>
        </>
    )
}
