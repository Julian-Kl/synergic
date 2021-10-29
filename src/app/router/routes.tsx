import { Start } from '../pages/start/Start'
import { ComponentComposer } from '../pages/componentComposer/ComponentComposer'

export interface routeObject {
    path: string
    name: string
    exact: boolean
    component: React.ReactNode
}

const routes: routeObject[] = [
    {
        path: '/',
        name: 'Start',
        exact: true,
        component: Start,
    },
    {
        path: '/component-composer',
        name: 'Component Composer',
        exact: true,
        component: ComponentComposer,
    },
]

export default routes
