import React, { createContext, useMemo, useState } from 'react'
import { Page } from '../types/Page'

interface CurrentEditedPageContextInterface {
    page: Page | null
    setPage: React.Dispatch<React.SetStateAction<Page | null>>
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
    const [page, setPage] = useState<Page | null>(null)

    const value = useMemo(() => ({ page, setPage }), [page, setPage])

    return (
        <CurrentEditedPageContext.Provider value={value}>
            {props.children}
        </CurrentEditedPageContext.Provider>
    )
}
