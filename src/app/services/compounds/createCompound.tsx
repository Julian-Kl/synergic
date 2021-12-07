import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const createCompound = async (name: string, type: 'molecules' | 'organisms'): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/${type}`,
        'POST',
        {
            name: name,
            grid: [],
        }
    )
    return response
}