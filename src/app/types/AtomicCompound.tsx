import { GridSize } from '@mui/material/Grid'
import { Atom } from './Atom'

export interface CompoundGrid {
    size: GridSize
    components: (Atom | AtomicCompound)[]
}

export interface AtomicCompound {
    id: number
    name: string
    grid: CompoundGrid[]
    type: 'molecules' | 'organisms'
}
