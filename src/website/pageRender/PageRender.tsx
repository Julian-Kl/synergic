import React from 'react'
import { Page } from '../../editor/types/Page'
import { PageGridRender } from './PageGridRender'

interface Props {
    page: Page
}

export const PageRender: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.page.content.map((organism, index) => (
                <PageGridRender key={index} compound={organism} />
            ))}
        </>
    )
}
