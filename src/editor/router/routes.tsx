import { CompoundEditor } from '../pages/CompoundEditor/CompoundEditor'
import { PageEditor } from '../pages/PageEditor/PageEditor'
import { Start } from '../pages/Start/Start'
import { TemplateEditor } from '../pages/TemplateEditor/TemplateEditor'
import { WebsitePreview } from '../pages/WebsitePreview/WebsitePreview'

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
        path: '/compound-editor',
        name: 'Compounds',
        exact: true,
        component: CompoundEditor,
    },
    {
        path: '/template-editor',
        name: 'Templates',
        exact: true,
        component: TemplateEditor,
    },
    {
        path: '/page-editor',
        name: 'Pages',
        exact: true,
        component: PageEditor,
    },
    {
        path: '/website-preview',
        name: 'Preview',
        exact: false,
        component: WebsitePreview,
    },
]

export default routes
