import { GridSize } from '@mui/material/Grid'
import { atomProps } from './atomProps'

export interface ComponentGrid {
    size: GridSize
    settings: object
    components: (atomProps | ComponentData)[]
}

export interface ComponentData {
    id: number
    name: string
    created_at: string
    grid: ComponentGrid[]
    published_at: string
    settings: object
    updated_at: string
    type: 'molecules' | 'organisms'
}
