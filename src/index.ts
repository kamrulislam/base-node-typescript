import { promisify, CUSTOM } from './promisify';

type CallbackFunctionObject = {(...args: any[]): void; [CUSTOM]?: any}


const greeter = (person: string, callback?: any) => {
    const greet = "Hello, " + person;
    if (callback) {
        callback(null, greet);
    }
    
    return greet;
}

let user = "Kamrul Islam";

console.log(greeter(user));

console.log(greeter(user, (greet: any) => {
    console.log(`callback ${greet}`);
}));

const asyncCall = async () => {
    await promisify(greeter)(user).then((result: any) => console.log(`promisify ${result}`));
} 

asyncCall();


const evenSuccess: CallbackFunctionObject = (n: number, onSuccess: (n: number) => void, onError: (n: number) => void) => {
    if (n % 2) {
      onError(n);
    } else {
      onSuccess(n);
    }
  };
  
  evenSuccess[CUSTOM] = (n: any) => new Promise((resolve, reject) => {
    evenSuccess(n, () => resolve("even"), () => reject("odd"));
  });
  
  promisify(evenSuccess)(2).then(console.log);

