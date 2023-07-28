import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
};