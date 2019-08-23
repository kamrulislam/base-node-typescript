import { promisify } from './promisify';

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


