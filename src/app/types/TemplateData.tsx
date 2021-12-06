import { AtomicCompound } from './AtomicCompound';

export interface TemplateData {
    id: number
    name: string
    created_at: string
    organisms: AtomicCompound[]
    published_at: string
    settings: object
    updated_at: string
    type: string
}
