import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const deleteTemplate = async (id: number): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/templates/${id}`,
        'DELETE'
    )

    return response
}