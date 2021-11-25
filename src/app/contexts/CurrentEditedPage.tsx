import React, { createContext, useMemo, useState } from 'react'
import { PageData } from '../types/PageData'

interface CurrentEditedPageContextInterface {
    page: PageData | null
    setPage: React.Dispatch<React.SetStateAction<PageData | null>>
}

export const CurrentEditedPageContext = createContext<CurrentEditedPageContextInterface | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const CurrentEditedPageContextProvider: React.FC<Props> = (
    props: Props
) => {
    const [page, setPage] = useState<PageData | null>(null)

    const value = useMemo(() => ({ page, setPage }), [page, setPage])

    return (
        <CurrentEditedPageContext.Provider value={value}>
            {props.children}
        </CurrentEditedPageContext.Provider>
    )
}
