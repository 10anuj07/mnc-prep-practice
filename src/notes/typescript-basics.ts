// 1. Basic Types
let age: number = 25;
let name: string = 'Rahul';
let isLoggedIn: boolean = true;

//2. Arrays
let scores: number[] = [90, 85, 92];
let tags: number[] = ['react', 'typescript'];

//3. Union Types - value can be one of multiple types
let id: string | number = 101;
id = 'ABC123'; // aslo valid

//4. Optional Properties - the ? means it may or may not exist
interface Product{
    id: number;
    name: string;
    description?: string;
}

//5. Function typing
const add = (a:number, b:number): number => {
    return a + b;
}

//6. Generics - reusable typed function (very important for interviews)
const getFirstItem = <T>(arr:T[]): T => {
    return arr[0];
}

const firstNumber = getFirstItem<number>([1, 2, 3]); // returns 1
const firstString = getFirstItem<string>(['a', 'b']); //returns 'a'