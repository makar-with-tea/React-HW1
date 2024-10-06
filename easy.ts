
export type MyPick<T, P extends keyof T> = {
    [K in P]: T[K];
}

export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

export type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

export type MyExclude<T, U> = T extends U ? never : T;


// examples of usage

// MyPick
type Student = {
    name: string;
    surname: string;
    group: number;
  };
  
type StudentFullName = MyPick<Student, 'name' | 'surname'>;
  
let person: StudentFullName = {name: 'Ivan', surname: 'Ivanov'};
console.log(person)

// NOfArray
type ExampleArray = [string, boolean];
type FirstElem = NOfArray<ExampleArray, 1>;
let num: FirstElem = false
console.log(typeof num)

// Unshift
type UnshiftArray = Unshift<ExampleArray, number> // UnshiftArray = [number, string, boolean]
let unshiftArr : UnshiftArray = [1, "aa", false]

// MyExclude
type Pet = MyExclude<"cat" | "dog" | "fish", "fish">; // Pet = "cat" | "dog"
let pet : Pet = "cat"
//let notPet : Pet = "fish" - ошибка