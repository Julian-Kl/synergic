import { Start } from '../pages/start/Start'
import { ComponentComposer } from '../pages/componentComposer/ComponentComposer'
import { TemplateEditor } from '../pages/templateEditor/TemplateEditor'
import { NavigationEditor } from '../pages/navigationEditor/NavigationEditor'
import { PageEditor } from '../pages/pageEditor/PageEditor'

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
    {
        path: '/template-editor',
        name: 'Template Editor',
        exact: true,
        component: TemplateEditor,
    },
    {
        path: '/page-editor',
        name: 'Page Editor',
        exact: true,
        component: PageEditor,
    },
    {
        path: '/navigation-editor',
        name: 'Navigation Editor',
        exact: true,
        component: NavigationEditor,
    },
]

export default routes
