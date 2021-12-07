import { Website } from '../../website/Website'
import { ComponentCreator } from '../pages/componentCreator/ComponentCreator'
import { PageEditor } from '../pages/pageEditor/PageEditor'
import { Start } from '../pages/start/Start'
import { TemplateEditor } from '../pages/templateEditor/TemplateEditor'

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
        path: '/components',
        name: 'Components',
        exact: true,
        component: ComponentCreator,
    },
    {
        path: '/templates',
        name: 'Templates',
        exact: true,
        component: TemplateEditor,
    },
    {
        path: '/pages',
        name: 'Pages',
        exact: true,
        component: PageEditor,
    },
    {
        path: '/preview',
        name: 'Preview',
        exact: false,
        component: Website,
    },
]

export default routes
