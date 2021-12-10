import React, { createContext, useMemo, useState } from 'react'
import { Compound } from '../../types/Compound'

interface SelectedOrganism {
    organism: Compound | null
    setOrganism: React.Dispatch<React.SetStateAction<Compound | null>>
    id: number | null
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const SelectedOrganism = createContext<SelectedOrganism | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedOrganismProvider: React.FC<Props> = (
    props: Props
) => {
    const [organism, setOrganism] = useState<Compound | null>(null)
    const [id, setId] = useState<number | null>(null)

    const value = useMemo(() => ({ organism, setOrganism, id, setId }), [
        organism,
        setOrganism,
        id,
        setId,
    ])

    return (
        <SelectedOrganism.Provider value={value}>
            {props.children}
        </SelectedOrganism.Provider>
    )
}
