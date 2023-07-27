import React from 'react';

let age: number = 10;
let name:string = 'John';
let fruits: string[] = ['apple', 'banana', 'mango'];
//tuple for mixing data types
let mixed: [string, number, boolean] = ['apple', 5, true];
const func = (value:string) => {
    console.log('value',value);
    return value
}

console.log(func('7'))

const Todo:React.FC = () => {
    return (
        <div>
            <h1>Generic ToDo App</h1>
        </div>
    );
};

export default Todo;