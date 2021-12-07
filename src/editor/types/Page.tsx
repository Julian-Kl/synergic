import { GridSize } from "@mui/material";

export type PageAtom = {
    name: string
    props: object
}

export interface PageCompoundGrid {
    size: GridSize
    components: (PageAtom | PageCompound)[]
}

export interface PageCompound {
    grid: PageCompoundGrid[]
}

export interface Page {
    id: number
    name: string
    title: string
    route: string
    templateId: string
    content:  PageCompound[]
}
