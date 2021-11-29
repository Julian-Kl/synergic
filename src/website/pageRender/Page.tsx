import React from 'react'
import { PageData } from '../../app/types/PageData'
import { PageGrid } from './PageGrid'

interface Props {
    page: PageData
}

export const Page: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.page.content.map((component, index) => (
                <PageGrid key={index} component={component} />
            ))}
        </>
    )
}
