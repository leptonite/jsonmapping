@leptonite/jsonmapping
======================

This package contains utility functions that can help you to validate and convert JSON data. Its primary usecase is conversion from JSON to instances of typescript classes, but you may convert to anything else.


Motivation
----------

Let's say we use a REST API that provides user objects:

```json
[
   {
      "id": 1,
      "title": "Professor",
      "firstName": "Albert",
      "lastName": "Einstein"
   },
   {
      "id": 2,
      "firstName": "Elsa",
      "lastName": "Einstein"
   }
]
```

We may have a typescript class like this as our user model:

```typescript
class User {

   public id: number;
   public title?: string;
   public firstName: string;
   public lastName: string;

   public get fullName(): string {
      return (this.title ? this.title + ' ' : '') + this.firstName + ' ' this.lastName;
   }

}
```

Working directly with the JSON response has disadvantages compared to instances of our User class:

```typescript
JSON.parse(response).forEach(user => {
   // user.fullName is undefined
   // user instanceof User is false
});
```

This is why I prefer to convert the json response into instances of my model classes. Another reason is that the structure of the json response gets checked against your expectation during this conversion. If your REST API and your client's model get out of sync (of course this doesn't happen to you, but just imagine…) you will notice as soon as possible. And you will get easy to understand error messages as we will see later.


JsonValue
---------

A `JsonValue` is anything you can encode as JSON and is defined like this:

```typescript
type JsonValue = null | boolean | number | string | JsonArray | JsonObject;

type JsonArray = Array<JsonValue>;

interface JsonObject {
   [key: string]: JsonValue;
}
```

The result of `JSON.parse(string)` is always a `JsonValue` (if it doesn't throw an Error).


JsonMapper
----------

A `JsonMapper` is a function that takes a `JsonValue` and validates it and/or converts it into something else. This is the most basic concept in @leptonite/jsonmapping:

```typescript
type JsonMapper<T> = (jsonValue: JsonValue) => T;
```

If validation failes or a `JsonMapper` failes to convert its input for another reason, it throws a `JsonMappingError`.


expect* functions
-----------------

@leptonite/jsonmapping shippes with some basic `JsonMapper`s:

```typescript
function expectBoolean(jsonValue: JsonValue): boolean
function expectNumber(jsonValue: JsonValue): number
function expectString(jsonValue: JsonValue): string
```

These functions just check the given `jsonValue` to be a `boolean`, `number` or `string`, respectively. A `JsonMappingError` will be thrown if `jsonValue` has the wrong type. Otherwise `jsonValue` will be returned unchanged.

```typescript
function expectInteger(jsonValue: JsonValue): number
function expectSafeInteger(jsonValue: JsonValue): number
```

`expectInteger` is like `expectNumber` but additionally assures `jsonValue` to be an [integer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger).

`expectSafeInteger` is like `expectNumber` but additionally assures `jsonValue` to be a [safe integer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

Examples:

```typescript
expectBoolean(false)   // returns false
expectBoolean(true)    // returns true
expectBoolean("false") // throws JsonMappingError: boolean expected in jsonValue

expectNumber(42)       // returns 42
expectNumber(3.1415)   // returns 3.1415
expectNumber("42")     // throws JsonMappingError: number expected in jsonValue

expectString(42)       // throws JsonMappingError: string expected in jsonValue
expectString("42")     // returns "42"
expectString(["42"])   // throws JsonMappingError: string expected in jsonValue

expectInteger(42)      // returns 42
expectInteger(42.0)    // returns 42
expectInteger(3.1415)  // throws JsonMappingError: integer expected in jsonValue
expectInteger("42")    // throws JsonMappingError: integer expected in jsonValue
```

dateFromJSON
------------

Timestamps in JSON are often represented as strings like `"2017-09-20T21:00:29.462Z"`, but you may prefer to work with `Date` objects instead. Use `dateFromJSON` to convert these strings to `Date`s:

```typescript
function dateFromJSON(jsonValue: JsonValue): Date
```

arrayMapper
-----------

A common case is a `JsonArray` where each element should be validated/converted in the same way. `arrayMapper` is a function that takes a `JsonMapper` that works for single array elements and returns a `JsonMapper` for an array of such values:

```typescript
function arrayMapper<T>(elementMapper: JsonMapper<T>): JsonMapper<Array<T>>
```

It is important to understand that `arrayMapper` *is not* a `JsonMapper` for arrays but it is a function that *creates* `JsonMapper`s for arrays. Let's look at some code:

```typescript
const expectStringArray = arrayMapper(expectString);
expectStringArray("foo")               // (1) throws JsonMappingError: array expected in jsonValue
expectStringArray(["foo", "bar"])      // (2) returns ["foo", "bar"]
expectStringArray(["foo", "bar", 42])  // (3) throws JsonMappingError: string expected in jsonValue[2]
```

Here `expectStringArray` is a `JsonMapper` which has been created by `arrayMapper`.

First, `expectStringArray` checks if the given jsonValue is an array and otherwise throws a JsonMappingError, as you see in example (1).

Second, `expectStringArray` iterates over the array and calls `expectString` for each element, collecting results in a new array. This is similar to an array's `map` function, as you see in example (2).

One main difference between `map` and `arrayMapper` is error handling: The mapper created by `arrayMapper` (`expectStringArray` in our example) catches errors throw by the given elementMapper (`expectString` in our example) and throws a new `JsonMappingError` with combined information, as you see in example (3): The error message 'string expected in jsonValue[2]' contains information from the original error ('string expected') and the array index where the error happened ('in jsonValue[2]').

This also works for nested arrays. Let's say we expect our json to contain a 3-dimensional number array:

```typescript
const expect3dimNumberArray = arrayMapper(arrayMapper(arrayMapper(expectNumber)));
expect3dimNumberArray([[[0, 1], [2, 3]], [[4, 5], [6, 7]]])      // returns [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]
expect3dimNumberArray([[[0, 1], [2, 3]], [[4, 5], ["six", 7]]])  // throws JsonMappingError: number expected in jsonValue[1][1][0]
```

objectMapper
------------

`objectMapper` is a function that creates `JsonMapper`s for objects:

```typescript
function objectMapper<T>(factory: (accessor: JsonObjectAccessor) => T): JsonMapper<T>

interface JsonObjectAccessor {
   get: <T>(propertyName: string, mapper: JsonMapper<T>) => T;
   getOptional<T>(propertyName: string, mapper: JsonMapper<T>): T | undefined;
   getOptional<T>(propertyName: string, mapper: JsonMapper<T>, defaultValue: T): T;
   ignore: (propertyName: string) => void;
}
```

There's no fun in trying to understand these signatures, so let's see an example where we use `objectMapper` to create a mapper for our `User` class:

```typescript
const json2User = objectMapper(accessor => {
   User user = new User();
   user.id = accessor.get("id", expectNumber);
   user.title = accessor.getOptional("title", expectString);
   user.firstName = accessor.get("firstName", expectString);
   user.lastName = accessor.get("lastName", expectString);
   return user;
});
```

TODO: explain what's going on here

And now let's use `json2User` to map json to User objects:

```typescript
json2User({ "id": 2, "firstName": "Elsa", "lastName": "Einstein" })  // returns a User object
json2User({ "id": 2, "firstName": "Elsa", "lastName": 1 })           // throws JsonMappingError: string expected in jsonValue.lastName
json2User({ "id": 2, "firstName": "Elsa", "lastname": "Einstein" })  // throws JsonMappingError: missing property lastName in jsonValue
```

mapObjectMapper
---------------

`mapObjectMapper` is a function that creates `JsonMapper`s for objects with arbitrary keys and a common value type, i.e. objects that are used as a map.
For example let's say we have an object that serves as a map with number values:

```typescript
const map = { "one": 1, "two": 2, "pi": 3.141529, "the answer": 42 }
```

We cannot use `objectMapper` for this because `objectMapper` requires us to know every occurring property name.
Instead we create a mapper for these kind of objects with `mapObjectMapper`:

```typescript
const expectNumberMap = mapObjectMapper(expectnumber);
const numberMap = expectNumberMap(map)
```

Tips
----

I'd usually prefer `json2User` to be a static method in our User class. And I tend to prefer immutable objects:

```typescript
class User {

   public constructor(
      public readonly id: number,
      public readonly title: string | undefined,
      public readonly firstName: string,
      public readonly lastName: string,
   ) {
   }

   public get fullName(): string {
      return (this.title ? this.title + ' ' : '') + this.firstName + ' ' this.lastName;
   }

   public static readonly fromJSON = objectMapper(accessor => new User(
      accessor.get("id", expectNumber);
      accessor.getOptional("title", expectString);
      accessor.get("firstName", expectString);
      accessor.get("lastName", expectString);
   ));

}
```

This can easily be combined with `arrayMapper` to convert our initial JSON example to an array of `User` objects:

```typescript
const userArrayMapper = arrayMapper(User.fromJSON);
userArrayMapper(JSON.parse(response))   // returns [ new User(...), new User(...) ]
```

TODO
----

* add documentation for
  * enumMapperByIdentifier
  * enumMapperByValue
  * delegatingMapper
  * strictObjectMapper
  * JsonObjectAccessor.ignore
  * arrayBufferMapper
  * arrayBufferToHexString
  * expectIntegerInRange
  * expectOneOf
  * expectValue
  * isJsonArray
  * isJsonObject
  * assertJsonArray
  * assertJsonObject
