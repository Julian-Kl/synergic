interface fetchApi {
    (
        url: string,
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | null,
        // eslint-disable-next-line @typescript-eslint/ban-types
        body?: object | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any
}

interface fetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    mode: 'cors'
    cache: 'no-cache'
    credentials: 'same-origin'
    headers?: HeadersInit | undefined
    body?: string
}

export const fetchApi: fetchApi = async (url, method, body) => {

    const options: fetchOptions = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
    }

    if (method) {
        Object.assign(options, {
            method: method,
        })
    }

    if (body) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    }

    let loading = true
        const response = await fetch(url, options)
        const data = await response.json()
        loading = false

    return { data, loading }
}
