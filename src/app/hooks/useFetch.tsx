import { useState, useEffect } from 'react'

interface useFetch {
    (
        url: string, 
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | null,
        body?: object | null
    ): any
}

interface fetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers?: HeadersInit | undefined
    body?: string
}

export const useFetch: useFetch = (url, method, body) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const options: fetchOptions = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
    }

    if(method){
        Object.assign(options, {
            method: method
        })
    }

    if(body){
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    const loadData = async () => {
        const response = await fetch(url, options)
        const data = await response.json()
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return { data, loading }
}
