// inspired by https://medium.com/trabe/understanding-nodes-promisify-and-callbackify-d2b04efde0e0

const CUSTOM = Symbol("promisify.custom");

type CallbackFunction = (...args: any[]) => Promise<any>;
type CallbackFunctionObject = {(...args: any[]): void; [CUSTOM]?: CallbackFunction}

const promisify = (fn : CallbackFunctionObject): CallbackFunction => {
    if (fn[CUSTOM]) {
        return fn[CUSTOM];
    }    

    return (...args: any[]): Promise<any> => new Promise((resolve, reject) => {
        fn(...args, (error: any, value: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });

    });
}

export {
    promisify,
    CUSTOM
}
