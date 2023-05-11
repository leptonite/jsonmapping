* indent with 3 spaces
* 100 % test coverage
* objectToMapMapper



Collection of users

class User {

   public constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly age: number,
   ) {
   }

   public static readonly fromJSON = strictObjectMapper(accessor => new User(
      accessor.get('id', expectString),
      accessor.get('name', expectString),
      accessor.get('age', expectNumber),
   ));

}


\                        representation in code | array                          | object                               | map                                    | set
 \                                              |                                |                                      |                                        |
  \__________________________________________   | [                              | {                                    | new Map([                              | new Set([
                                             \  |    new User('u1', 'John', 21), |    'u1': new User('u1', 'John', 21), |    ['u1', new User('u1', 'John', 21)], |    new User('u1', 'John', 21),
                                              \ |    new User('u2', 'Jane', 21), |    'u2': new User('u2', 'Jane', 21), |    ['u2', new User('u2', 'Jane', 21)], |    new User('u2', 'Jane', 21),
representation in JSON                         \| ]                              | }                                    | ])                                     | ])
------------------------------------------------*--------------------------------+--------------------------------------+----------------------------------------+---------------------------------
                                                |                                |                                                                               |
array                                           | JSON.stringify(users)          |                                                                               | JSON.stringify()
                                                |                                |
[                                               | arrayMapper(User.fromJSON)     |
   { "id": "u1", "name": "John", "age": 21 },   |                                |
   { "id": "u2", "name": "Jane", "age": 21 },   |                                |
]                                               |                                |
                                                |                                |
------------------------------------------------+--------------------------------+--------------------------------------------
                                                |
object                                          |
                                                |
{                                               |
   "u1": { id: "u1", name: "John", "age": 21 }, |
   "u2": { id: "u2", name: "Jane", "age": 21 }, |
}                                               |
                                                |
------------------------------------------------+
                                                |
object without keys duplicated in values        |
                                                |
{                                               |
   "u1": { name: "John", "age": 21 },           |
   "u2": { name: "Jane", "age": 21 },           |
}                                               |
                                                |
