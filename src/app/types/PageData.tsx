import { GridSize } from "@mui/material";

export type structureAtom = {
    name: string
    props: object
}

export interface structureComponentGrid {
    size: GridSize
    components: (structureAtom | StructureComponentData)[]
}

export interface StructureComponentData {
    grid: structureComponentGrid[]
}

export interface PageData {
    id: number
    name: string
    title: string
    route: string
    templateId: string
    content:  StructureComponentData[]
    created_at: string
    updated_at: string
}
