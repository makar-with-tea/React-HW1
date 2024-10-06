export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type MyCapitalize<T extends string> = T extends `${infer First}${infer Other}` 
    ? `${Uppercase<First>}${Other}` : T;

export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

export type ParseURLParams<StringElem extends string> = StringElem extends `${infer _Addr}:${infer Param}/${infer Other}`
    ? Param | ParseURLParams<Other>
    : StringElem extends `${infer _Addr}:${infer Param}`
    ? Param
    : never;


// examples of usage

// DeepPartial
type RussianDoll = {
    bigDoll: {
        mediumDall: {
            smallDall: {
                size: number;
            }
            size: number;
        }
        size: number;
    };
};

let partialDoll : DeepPartial<RussianDoll> = {
    bigDoll: {
        mediumDall: {
            size: 2
        },
        size: 3
    }
}
console.log(partialDoll)

// MyCapitalize
type Greeting = MyCapitalize<"hello, world!"> // Greeting = "Hello, world!"
let greet : Greeting = "Hello, world!"
type Parting = MyCapitalize<"GOODBYE!"> // Parting = "GOODBUE!"
let bye : Parting = "GOODBYE!"
console.log(greet, bye)

// DeepMutable
type ReadonlyAnimal = {
    readonly name: String;
    readonly eats: {
        readonly plants: string[];
        readonly animals: string[];
    };
};
type MutableAnimal = DeepMutable<ReadonlyAnimal>;
let hedgehog : MutableAnimal = {
    name: "hedgehog",
    eats: {
        plants: ["apple"],
        animals: ["mouse"]
    }
}
hedgehog.eats.plants = []
console.log(hedgehog)

// ParseURLParams
type ParamsFromTask = ParseURLParams<'posts/:id/:user'>;  // "id" | "user"
type HedgehogParams = ParseURLParams<"www.hedgehog.ru/:apple/:needles"> // "apple" | "needles"
let apple : HedgehogParams = "apple"
//let mouse : HedgehogParams = "mouse" - ошибка
console.log(apple)