// 1. Basic Types
let age: number = 25;
let name2: string = 'Rahul';
let isLoggedIn: boolean = true;

//2. Arrays
let scores: number[] = [90, 85, 92];
let tags: string[] = ['react', 'typescript'];

//3. Union Types - value can be one of multiple types
let id: string | number = 101;
id = 'ABC123'; // aslo valid

//4. Optional Properties - the ? means it may or may not exist
interface Product{
    id: number;
    name1: string;
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



//Input Change
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

//Textarea change
const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {}

//Select/Dropdown change
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {}

//Button click
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}

//Form submit - always use this for forms
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stops page reload
}

//Keyboard events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') { /* do something */ }
}
export {};