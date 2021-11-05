import { useState, useEffect } from 'react'

export const useFetch = (url: string): any => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        const response = await fetch(url)
        console.log(response)
        const data = await response.json()
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return { data, loading }
}
