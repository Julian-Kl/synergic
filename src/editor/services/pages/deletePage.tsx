import { contentApiUrl } from "../base/contentApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const deletePage = async (id: number): Promise<Response>  => {
    const response = await fetchApi(
        `${contentApiUrl}/pages/${id}`,
        'DELETE'
    )

    return response
}