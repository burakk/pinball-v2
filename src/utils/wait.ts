export function wait(time: number) {

    let timeoutRef: number;
    let rejectFunc: () => unknown;

    const promise = new Promise((resolve, reject) => {
        rejectFunc = reject;
        timeoutRef = setTimeout(() => {
            resolve(true);
        }, time)

    })


    const clear = () => {
        clearTimeout(timeoutRef)
        rejectFunc();
    }


    return [promise, clear];
}


