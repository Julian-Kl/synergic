import { Start } from '../pages/start/Start'
import { ComponentCreator } from '../pages/componentCreator/ComponentCreator'
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
        path: '/component-creator',
        name: 'Components',
        exact: true,
        component: ComponentCreator,
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
        path: '/navigation-editor',
        name: 'Navigation',
        exact: true,
        component: NavigationEditor,
    }
]

export default routes
