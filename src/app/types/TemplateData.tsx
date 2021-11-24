import { ComponentData } from './ComponentData'

export interface TemplateData {
    id: number
    name: string
    created_at: string
    organisms: ComponentData[]
    published_at: string
    settings: object
    updated_at: string
    type: string
}
