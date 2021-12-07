import { PageCompound } from '../../types/Page'
import { contentApiUrl } from '../base/contentApiUrl'
import { fetchApi, Response } from '../base/fetchApi'

export const updatePageContent = async (
    id: number,
    content: PageCompound[]
): Promise<Response> => {
    const response = await fetchApi(`${contentApiUrl}/pages/${id}`, 'PUT', {
        content: content,
    })

    return response
}
