import { Website } from '../../website/Website'
import { CompoundEditor } from '../pages/CompoundEditor/CompoundEditor'
import { PageEditor } from '../pages/PageEditor/PageEditor'
import { Start } from '../pages/Start/Start'
import { TemplateEditor } from '../pages/TemplateEditor/TemplateEditor'

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
        component: CompoundEditor,
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
