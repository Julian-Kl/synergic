import { CompoundGrid } from "../../types/Compound"
import { builderApiUrl } from "../base/builderApiUrl"
import { fetchApi, Response } from "../base/fetchApi"

export const updateCompoundGrid = async (id: number, type: 'molecules' | 'organisms', grid: CompoundGrid[]): Promise<Response>  => {
    const response = await fetchApi(
        `${builderApiUrl}/${type}/${id}`,
        'PUT',
        {
            grid: grid,
        }
    )
    return response
}