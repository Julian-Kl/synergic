import { contentApiUrl } from '../base/contentApiUrl'
import { fetchApi, Response } from '../base/fetchApi'

export const updatePageProperty = async (
    id: number,
    property: string,
    value: string
): Promise<Response> => {
    const response = await fetchApi(`${contentApiUrl}/pages/${id}`, 'PUT', {
        [property]: value,
    })

    return response
}
