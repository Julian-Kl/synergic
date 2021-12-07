import React from 'react'
import { Page } from '../../editor/types/Page'
import { PageGrid } from './PageGrid'

interface Props {
    page: Page
}

export const PageRender: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.page.content.map((component, index) => (
                <PageGrid key={index} component={component} />
            ))}
        </>
    )
}
