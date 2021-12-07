import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const deleteCompound = async (id: number, type: 'molecules' | 'organisms'): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/${type}/${id}`,
        'DELETE'
    )

    return response
}