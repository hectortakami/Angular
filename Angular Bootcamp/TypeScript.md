# TypeScript

###### JavaScript Problems (before ES6)

- Un-strict variable typing (no int, string, bool)
- Non existing static methods
- Classes and modules
- Autocomplete of variables and run-time error detection (while writing code)

###### Compile any TypeScript .ts extention to .js manually

```console
tsc <typescript_file>
```

###### TypeScript Variables

[ X ] var = It's a dynamic assignation for memory, global scope and can be overwritten.

[ √ ] let = Defines a LOCAL SCOPE variable assignment in memory.
[ √ ] const = Defines an UN-CHANGABLE variable in memory.
They occupied less memory because they don't have operations assigned.

- string `< '' | "" >`
- number `< 1 | 1.2 | -12.5 >`
- boolean `< true | false >`
- any `< string | number | boolean | Date >` NOT used in the best practices of ES6+

Literal Template : `${variable}` ( used with `back-ticks` no 'single-quotes' )

###### Function Paramenters

- Mandatory Params

  ```typescript
  function foo(input: type) {}
  ```

- Optional Params

  ```typescript
  function foo(input?: type) {}
  ```

- Default Params

  ```typescript
  function foo(input: string = "default") {}
  ```

###### Arrow Functions

```typescript
//                      params       return type
const sumNum = (a: number, b: number): number => a + b;

// equals to

const sumNum = function(a: number, b: number) {
  return a + b;
};
```

_Note: The arrow functions DO NOT modify the 'this' scope, they can be run as ANONYMOUS FUNCTIONS_

###### Object & Array Destructuring

```typescript
const myObject = {
 name: 'Peter Parker', const myArray: string[] = ['Thor', 'IronMan', 'Hulk']
alias: 'Spider-man'
}
```

- As variables:

  ```typescript
  const { name, alias } = myObject;
  ```

  ```typescript
  const [god, billionaire, smash] = myArray;
  ```

  _(if we don't need any value just leave a space respecting the order `[ , , smash ]`)_

* As function params:

  ```typescript
  const myFunction = ({ name, alias }: myObject<Type>) => {};
  ```

  ```typescript
  const myFunction = ( [ god, billionaire, smash ]: myArray[<Type>] ) => {}
  ```

###### Promises (Async & Await)

```typescript
const myPromiseFunc = (): Promise<RESOLVE_TYPE> => {
  return new Promise((resolve, reject) => {
    // Here goes all the ASYNC requests
  });
};

myPromiseFunc
  .then(success => {
    // Here goes the implementation after RESOLVE the AWAIT request successfully
  })
  .catch(error => {
    // Here goes the implementation if the request is REJECTED
  });
```

###### Interfaces & Classes

- Defining an Interface & a Class

  ```typescript
  interface Hero {
    name: string;
    alias: string;
    staminaPoints?: number; // By adding '?' it convert the property 'staminaPoints' optional
  }
  ```

  ```typescript
  class Avenger {
  constructor(
    private hero: Hero , // Mandatory init
    private location: string, // Mandatory init
    private since?: Date, // Optional init
    private activeMember: boolean = true // Default init
    ){}
  ```

- Implementing an Interface & a Class

  ```typescript
  const newHero: Hero = {
    name: "Stephen Strange",
    alias: "Doctor Strange"
  };
  ```

  ```typescript
  const newAvenger: Avenger = new Avenger(newHero, "New York");
  ```

###### Decorators

Expands the properties and functionalities of a class by adding it before,
the class definition. ( Similar to inheritance )

```typescript
function FooDecorator() {
  // Extra methods
}
```

```typescript
@FooDecorator
class MyClass {
  // TODO
}
```

_Note: The main difference with 'extends' is that we don't need to implement
the other class methods while adding functions avoiding the complexity
and keeping the modularity._

#### Cheat Sheet

- ###### Find if a search term is in our database
  _String containing a substring_
  ```typescript
  array.forEach(value => {
    // Use ' .includes() ' function
    if (value.includes(searchTerm)) {
      //   TODO when we find a        coincidence
    }
  });
  ```
- ###### Verify string as a valid Email
  _String as email format_
  ```typescript
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if ("myString@mail.com".match(mailformat)) {
    return true;
  } else {
    return false;
  }
  ```
