import { Compound } from "../../types/Compound"
import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const updateTemplateOrganisms = async (id: number, organisms: Compound[]): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/templates/${id}`,
        'PUT',
        {
            organisms: organisms,
        }
    )
    return response
}