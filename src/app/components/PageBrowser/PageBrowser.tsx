import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrentEditedPageContext } from '../../contexts/CurrentEditedPage'
import { contentApiUrl } from '../../services/contentApiUrl'
import { fetchApi } from '../../services/fetchApi'
import { PageData } from '../../types/PageData'
import { AddTemplate } from '../atoms/AddTemplate/AddTemplate'
import { LoadingBackdrop } from '../atoms/LoadingBackdrop/LoadingBackdrop'
import { PageBrowserItem } from './PageBrowserItem/PageBrowserItem'

export const PageBrowser: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)
    const [data, setData] = useState<PageData[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetchApi(`${contentApiUrl}/pages`)
        setData(response.data)
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
            data.push(response.data)
            setData([...data])
        }
    }

    const deletePage = async (id: number) => {
        if (id) {
            const response = await fetchApi(
                `${contentApiUrl}/pages/${id}`,
                'DELETE'
            )

            const updatedData: PageData[] = data.filter(function (value) {
                return value.id != response.data.id
            })

            setData([...updatedData])
            currentEditedPage?.setPage(null)
        }
    }

    const selectPage = (page: PageData) => {
        currentEditedPage?.setPage(page)
    }

    const isSelected = (page: PageData) => {
        return page.id === currentEditedPage?.page?.id
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            <Grid container spacing={2}>
                {data &&
                    data.map((page: PageData) => (
                        <Grid
                            key={page.id}
                            item
                            xs={12}
                            onClick={() => selectPage(page)}
                        >
                            <PageBrowserItem
                                id={page.id}
                                deletePage={deletePage}
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
