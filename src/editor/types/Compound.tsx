import { GridSize } from '@mui/material/Grid'
import { Atom } from './Atom'

export interface CompoundGrid {
    size: GridSize
    components: (Atom | Compound)[]
}

export interface Compound {
    id: number
    name: string
    grid: CompoundGrid[]
    type: 'molecules' | 'organisms'
}
