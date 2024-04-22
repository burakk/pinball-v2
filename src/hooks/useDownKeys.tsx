import { useEffect, useRef } from "react";

export function useDownKeys() {
    const downKeysRef = useRef<{ [k: string]: boolean }>({})

    useEffect(() => {
        window.addEventListener('keydown', e => {
            const key = e.key;
            downKeysRef.current[key] = true;
            //updateActiveKeys(key, true);
            //testbed.keydown && testbed.keydown(keyCode, String.fromCharCode(keyCode));
        });

        window.addEventListener('keyup', e => {
            const key = e.key;
            downKeysRef.current[key] = false;
            //updateActiveKeys(keyCode, false);
            //testbed.keyup && testbed.keyup(keyCode, String.fromCharCode(keyCode));


        });
    }, [])


    return downKeysRef.current;
}