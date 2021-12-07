import { PageCompound } from "../../types/Page"
import { contentApiUrl } from "../base/contentApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const updatePageTemplate = async (pageId: number, templateId: string, content: PageCompound[]): Promise<Response> => {
    const response = await fetchApi(
        `${contentApiUrl}/pages/${pageId}`,
        'PUT',
        {
            templateId: templateId,
            content: content,
        }
    )
    return response
}