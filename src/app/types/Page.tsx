import { GridSize } from "@mui/material";

export type PageAtom = {
    name: string
    props: object
}

export interface PageCompoundGrid {
    size: GridSize
    components: (PageAtom | PageAtomicCompound)[]
}

export interface PageAtomicCompound {
    grid: PageCompoundGrid[]
}

export interface Page {
    id: number
    name: string
    title: string
    route: string
    templateId: string
    content:  PageAtomicCompound[]
}
