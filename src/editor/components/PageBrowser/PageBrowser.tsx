import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedPage } from '../../contexts/PageEditor/SelectedPage'
import { createPage } from '../../services/pages/createPage'
import { deletePage } from '../../services/pages/deletePage'
import { getPages } from '../../services/pages/getPages'
import { Page } from '../../types/Page'
import { AddTemplate } from '../atoms/AddTemplate/AddTemplate'
import { LoadingBackdrop } from '../atoms/LoadingBackdrop/LoadingBackdrop'
import { PageBrowserItem } from './PageBrowserItem/PageBrowserItem'

export const PageBrowser: React.FC = () => {
    const selectedPage = useContext(SelectedPage)
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await getPages()
        setPages(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [selectedPage])

    const addPage = async (name: string) => {
        const response = await createPage(name)
        pages.push(response.data)
        setPages([...pages])
    }

    const removePage = async (id: number) => {
        const response = await deletePage(id)

        const updatedData: Page[] = pages.filter(function (value) {
            return value.id != response.data.id
        })

        setPages([...updatedData])
        selectedPage?.setPage(null)
    }

    const selectPage = (page: Page) => {
        selectedPage?.setPage(page)
    }

    const isSelected = (page: Page) => {
        return page.id === selectedPage?.page?.id
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            <Grid container spacing={2}>
                {pages &&
                    pages.map((page: Page) => (
                        <Grid
                            key={page.id}
                            item
                            xs={12}
                            onClick={() => selectPage(page)}
                        >
                            <PageBrowserItem
                                id={page.id}
                                deletePage={removePage}
                                selected={isSelected(page)}
                            >
                                {page.name}
                            </PageBrowserItem>
                        </Grid>
                    ))}
                <AddTemplate components='templates' createComponent={addPage} />
            </Grid>
        </>
    )
}
