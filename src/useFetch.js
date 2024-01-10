import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortController.signal })
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error("Error 404:   Could not fetch data from the resource");
                    }
                    return response.json()
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((error) => {
                    if(error.name === "AbortError"){
                        console.log("Fetch Aborted!")
                    }
                    setIsPending(false);
                    setError(error.message)
                });
        }, 500);

        return () => abortController.abort;
    }, [url]);

    return { data, isPending, error };
}


export default useFetch;