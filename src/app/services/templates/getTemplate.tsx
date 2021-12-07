import { builderApiUrl } from '../base/builderApiUrl'
import { fetchApi, Response } from '../base/fetchApi'

export const getTemplate = async (id: number | string): Promise<Response> => {
    const response = await fetchApi(`${builderApiUrl}/templates/${id}`)
    return response
}
