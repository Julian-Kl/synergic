import { Compound } from './Compound';

export interface Template {
    id: number
    name: string
    organisms: Compound[]
    type: 'templates'
}
