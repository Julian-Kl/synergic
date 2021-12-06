import { AtomicCompound } from './AtomicCompound';

export interface Template {
    id: number
    name: string
    organisms: AtomicCompound[]
    type: 'templates'
}
