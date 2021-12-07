import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedPageContext } from '../../contexts/CurrentEditedPage'
import { contentApiUrl } from '../../services/base/contentApiUrl'
import { fetchApi } from '../../services/base/fetchApi'
import { deletePage } from '../../services/pages/deletePage'
import { Page } from '../../types/Page'
import { AddTemplate } from '../atoms/AddTemplate/AddTemplate'
import { LoadingBackdrop } from '../atoms/LoadingBackdrop/LoadingBackdrop'
import { PageBrowserItem } from './PageBrowserItem/PageBrowserItem'

export const PageBrowser: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${contentApiUrl}/pages`)
        setPages(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [currentEditedPage])

    const createPage = async (name: string) => {
        if (name) {
            const response = await fetchApi(`${contentApiUrl}/pages`, 'POST', {
                name: name,
                title: name,
                route: encodeURIComponent(name),
                template: '',
                structure: [],
                content: [],
            })
            pages.push(response.data)
            setPages([...pages])
        }
    }

    const removePage = async (id: number) => {
        const response = await deletePage(id)

        const updatedData: Page[] = pages.filter(function (value) {
            return value.id != response.data.id
        })

        setPages([...updatedData])
        currentEditedPage?.setPage(null)
    }

    const selectPage = (page: Page) => {
        currentEditedPage?.setPage(page)
    }

    const isSelected = (page: Page) => {
        return page.id === currentEditedPage?.page?.id
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
                <AddTemplate
                    components='templates'
                    createComponent={createPage}
                />
            </Grid>
        </>
    )
}
