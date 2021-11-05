
import React, { createContext, useMemo, useState } from "react";

interface LoadingContextInteface {
    loading: boolean 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextInteface | null>(null);

interface Props {
    children: React.ReactNode
}

export const LoadingContextProvider: React.FC<Props> = (props: Props) => {
    const [loading, setLoading] = useState(false);

    const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

    return (
        <LoadingContext.Provider value={value}>
            {props.children}
        </LoadingContext.Provider>
    )
}