import { GridSize } from "@mui/material";
import { AtomProps } from "./Atom";

export type PageAtom = {
    name: string
    props: AtomProps
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
    description: string
    route: string
    templateId: string
    content:  PageCompound[]
}
