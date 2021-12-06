import { GridSize } from '@mui/material/Grid'
import { AtomProps } from './AtomProps'

export interface ComponentGrid {
    size: GridSize
    settings: object
    components: (AtomProps | AtomicCompound)[]
}

export interface AtomicCompound {
    id: number
    name: string
    created_at: string
    grid: ComponentGrid[]
    published_at: string
    settings: object
    updated_at: string
    type: 'molecules' | 'organisms'
}
