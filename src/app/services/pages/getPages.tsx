import { contentApiUrl } from "../base/contentApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const getPages = async (): Promise<Response> => {
    const response = await fetchApi(`${contentApiUrl}/pages`)
    return response
}