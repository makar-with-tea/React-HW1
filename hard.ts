type SnakeToCamelCase<Str extends string> = Str extends `${infer First}_${infer Other}`
  ? `${First}${Capitalize<SnakeToCamelCase<Other>>}`
  : Str;

export type Camelize<ObjectType> = {
  [T in keyof ObjectType as SnakeToCamelCase<string & T>] : ObjectType[T] extends object 
  ? Camelize<ObjectType[T]> 
  : ObjectType[T];
};


type At<T, Path> =
  Path extends keyof T ? T[Path] :
  Path extends `${infer First}.${infer Other}` 
    ? First extends keyof T 
        ? At<T[First], Other> 
        : never 
    : never;

export type DeepPick<T, Paths extends string> = {
  [Path in Paths as Path extends `${infer First}.${infer _Other}` ? First : Path]: 
    Path extends `${infer First1}.${infer Other1}` 
    ? DeepPick<At<T, First1>, Other1> 
    : At<T, Path>
};


// examples of usage

// Camelize
type SnakeCandy = {
    name: string,
    number_of_kcal: number,
    is_sour: boolean,
    is_sweet: boolean,
    has_chocolate: boolean,
    wrapper_color: string
}
type CamelCandy = Camelize<SnakeCandy>;
let belochka : CamelCandy = {
    name: "Белочка",
    numberOfKcal: 58,
    isSour: false,
    isSweet: true,
    hasChocolate: true,
    wrapperColor: "зеленый"
}
console.log(belochka)

// DeepPick
type Animal = {
    name: String,
    eats: {
        plants: string[],
        animals: string[]
    },
    isCute: boolean
}
type PickedAnimal = DeepPick<Animal, 'isCute' | 'eats.animals'>
let somethingCute : PickedAnimal = {
    isCute: true,
    eats: {
        animals: ["nobody because it's too cute for that"],
    }
}
console.log(somethingCute)