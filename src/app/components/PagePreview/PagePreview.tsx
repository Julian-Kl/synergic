import React, { useContext } from 'react'
import { CurrentEditedPageContext } from '../../contexts/CurrentEditedPage'

export const PagePreview: React.FC = () => {
    const currentEditedPage = useContext(CurrentEditedPageContext)

    console.log('PagePreview, Context:')
    console.log(currentEditedPage?.page)

    return <div>PagePreview</div>
}
