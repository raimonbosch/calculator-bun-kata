# WELCOME to the calculator Kata!

Please provide a solution in code for the problem below. If you have any question please create an Issue in this repository.

**Note:** The challenge can be solved in the language you are more comfortable with. This also applies for the tests, some in Javascript are included, but you can add your own in the language/testing framework of your choice.

## Sum of Numbers 

You should create an CLI application that takes a sum as a string in either digits, spanish or english and returns its result as string in the same language (digits/spanish/english).

The string will be two numbers and an infix operator (+/mas/plus).

Max number is 999 and min number is 0.

The entry point of the CLI is the file `calculate`. This file already already exists in the repository but implementation is missing.

### Examples of valid numbers
345

three hundred forty-five

trescientos cuarenta y cinco

101

one hundred one

ciento uno

215

two hundred fifteen

doscientos quince

### Examples of invalid inputs
onehundred

tres cientos


# Proposed Solution to the Kata

![Sum Calculator Challenge - Sum Calculator Challenge (1)](https://github.com/user-attachments/assets/c0baf49e-774e-48be-aadc-c8d7f2fd8470)

The structure of the solution is based on using a `GrammarRepository` implemented by reading a Json with a format like the following:

```json
{
  "es": {
    "HTaU": "sum; 0, 1, 3",
    "HT": "sum; 0, 1",
    "HU": "sum; 0, 1",
    "U": "sum; 0",
    "T": "sum; 0",
    "H": "sum; 0",
    "TaU": "sum; 0, 2",
    "mU": "out-of-range; 0",
    "M": "out-of-range; 0",
    "UM": "out-of-range; 0"
  },
  "en": {
    "UH": "mul; 0, 1",
    "U": "sum; 0",
    "T": "sum; 0",
    "UHTaU": "mulsum; 0, 1; 2, 4",
    "UHT": "mulsum; 0, 1; 2",
    "UHU": "mulsum; 0, 1; 2",
    "mU": "out-of-range; 0",
    "aU": "out-of-range; 0",
    "M": "out-of-range; 0",
    "UM": "out-of-range; 0"
  }
}
```

Where `H` represents hundreds, `T` the tens, `U` units, `a` conjunctions and `M` thousands. Each grammar found once detected will perform a fixed operation. For instance, the grammar `UHTaU` could correspond to `three hundred sixty-two` and would perform a `mulsum` operation that consist in multiplying `3*100` and then summing up the result to `60 + 2`. Apart from that operation we could use `mul` for multiplications, `sum` for sums and `out-of-range` to represent those operations that must trigger an `OutOfRangeError` because they are higher than 999.

So the general process of calculation of the `CalculatorUseCase` would be as follows:

1. Call to `GrammarElementParserService` and convert each token into a `GrammarElement`. So `one hundred` would become two grammar elements `U` and `H` represented as an GrammarElement[].
2. Send the calculated GrammarElements back to the use case.
3. Once we have this list of `GrammarElement` we query to our `GrammarRepository` and get the corresponding `Grammar`. This `Grammar` contains the operation to be performed.
4. With the `Grammar` itself we call to `Grammar.apply` and the operation will be performed. So we get the number calculation.
5. Finally, we would call to our `TranslationService` in order to convert the calculated result number into a text again by reusing our GrammarElements to convert numbers in text.


## How to run 

> bun install

> bun test

or

> ./calculate "two plus three"

or

If you want to interact via UI, do:

> bun dev

In http://localhost:3000 you'll find a calculator to perform operations.
