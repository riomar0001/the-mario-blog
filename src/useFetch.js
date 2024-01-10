import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
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
                setIsPending(false);
                setError(error.message)
            });
    }, []); // eslint-disable-next-line

    return { data, isPending, error };
}


export default useFetch;