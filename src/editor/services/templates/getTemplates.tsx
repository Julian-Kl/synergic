import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const getTemplates = async (): Promise<Response> => {
    const response = await fetchApi(`${builderApiUrl}/templates`)
    return response
}