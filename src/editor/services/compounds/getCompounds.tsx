import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const getCompounds = async (type: 'molecules' | 'organisms'): Promise<Response> => {
    const response = await fetchApi(`${builderApiUrl}/${type}`)
    return response
}