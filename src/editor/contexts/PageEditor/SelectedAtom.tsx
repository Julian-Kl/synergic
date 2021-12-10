import React, { createContext, useMemo, useState } from 'react'
import { PageAtom } from '../../types/Page'

interface SelectedAtom {
    atom: PageAtom | null
    setAtom: React.Dispatch<React.SetStateAction<PageAtom | null>>
    locator: (string | number)[] | null
    setLocator: React.Dispatch<React.SetStateAction<(string | number)[] | null>>
}

export const SelectedAtom = createContext<SelectedAtom | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedAtomProvider: React.FC<Props> = (
    props: Props
) => {
    const [atom, setAtom] = useState<PageAtom | null>(null)
    const [locator, setLocator] = useState<(string | number)[] | null>(null)

    const value = useMemo(() => ({ atom, setAtom, locator, setLocator }), [
        atom,
        setAtom,
        locator,
        setLocator,
    ])

    return (
        <SelectedAtom.Provider value={value}>
            {props.children}
        </SelectedAtom.Provider>
    )
}
