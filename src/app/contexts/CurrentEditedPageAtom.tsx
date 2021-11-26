import React, { createContext, useMemo, useState } from 'react'
import { structureAtom } from '../types/PageData'

interface CurrentEditedPageAtomContext {
    atom: structureAtom | null
    setAtom: React.Dispatch<React.SetStateAction<structureAtom | null>>
    locator: (string | number)[] | null
    setLocator: React.Dispatch<React.SetStateAction<(string | number)[] | null>>
}

export const CurrentEditedPageAtomContext = createContext<CurrentEditedPageAtomContext | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedPageAtomContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [atom, setAtom] = useState<structureAtom | null>(null)
    const [locator, setLocator] = useState<(string | number)[] | null>(null)

    const value = useMemo(() => ({ atom, setAtom, locator, setLocator }), [
        atom,
        setAtom,
        locator,
        setLocator,
    ])

    return (
        <CurrentEditedPageAtomContext.Provider value={value}>
            {props.children}
        </CurrentEditedPageAtomContext.Provider>
    )
}
