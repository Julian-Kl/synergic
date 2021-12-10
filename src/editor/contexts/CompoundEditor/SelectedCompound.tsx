import React, { createContext, useMemo, useState } from 'react'
import { Compound } from '../../types/Compound'

interface SelectedCompound {
    compound: Compound | null
    setCompound: React.Dispatch<React.SetStateAction<Compound | null>>
}

export const SelectedCompound = createContext<SelectedCompound | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedCompoundProvider: React.FC<Props> = (
    props: Props
) => {
    const [compound, setCompound] = useState<Compound | null>(null)

    const value = useMemo(() => ({ compound, setCompound }), [
        compound,
        setCompound,
    ])

    return (
        <SelectedCompound.Provider value={value}>
            {props.children}
        </SelectedCompound.Provider>
    )
}
