import React, { createContext, useMemo, useState } from 'react'
import { Page } from '../../types/Page'

interface SelectedPage {
    page: Page | null
    setPage: React.Dispatch<React.SetStateAction<Page | null>>
}

export const SelectedPage = createContext<SelectedPage | null>(
    null
)

interface Props {
    children: React.ReactNode
}

export const SelectedPageProvider: React.FC<Props> = (
    props: Props
) => {
    const [page, setPage] = useState<Page | null>(null)

    const value = useMemo(() => ({ page, setPage }), [page, setPage])

    return (
        <SelectedPage.Provider value={value}>
            {props.children}
        </SelectedPage.Provider>
    )
}
