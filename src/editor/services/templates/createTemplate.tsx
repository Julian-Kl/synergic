import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const createTemplate = async (name: string): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/templates`,
        'POST',
        {
            name: name,
            organisms: [],
        }
    )

    return response
}