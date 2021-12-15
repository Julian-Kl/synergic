import { contentApiUrl } from '../base/contentApiUrl'
import { fetchApi, Response } from '../base/fetchApi'

export const createPage = async (name: string): Promise<Response> => {
    const response = await fetchApi(`${contentApiUrl}/pages`, 'POST', {
        name: name,
        title: name,
        description: `Welcome to ${name}`,
        route: encodeURIComponent(name),
        template: '',
        content: [],
    })
    return response
}