import { useCallback, useEffect, useState } from "react";

type HttpConfig = RequestInit;

async function sendHttpRequest<T>(url: string, config?: HttpConfig): Promise<T> {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${resData.message || 'Unknown error'}`);
    }
    return resData;
}


export default function useHttp<T = any>(url: string, config?: HttpConfig, initialData?: T) {
    const [data, setData] = useState<T | null>(initialData || null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function clearData() {
        setData(initialData || null);
    }

   const sendRequest = useCallback(async function sendRequest(data?: any) {
    setIsLoading(true);                                                             
    try {
        const fetchConfig = data !== undefined
            ? { ...config, body: data }
            : { ...config };
        const resData = await sendHttpRequest<T>(url, fetchConfig);
        setData(resData);

    } catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('An unknown error occurred');
        }
    } finally {
        setIsLoading(false);    
    }
   }, [url, config]);
   useEffect(() => {
    if (config && (config.method === 'GET' || !config?.method || !config)) {
        sendRequest();
    }
   }, [sendRequest, config]);

   return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
   }
}