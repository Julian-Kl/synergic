import { GridSize } from '@mui/material/Grid'

export interface Component {
    name: string
    props: object
}

export interface ComponentGrid {
    size: GridSize
    settings: object
    components: Component[]
}

export interface ComponentData {
    id: number
    name: string
    created_at: string
    grid: ComponentGrid[]
    published_at: string
    settings: object
    updated_at: string
    type: string
}