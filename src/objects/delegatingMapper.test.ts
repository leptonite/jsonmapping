import { expect, test } from '@jest/globals';

import '../toThrowJsonMappingError';
import { delegatingMapper } from './delegatingMapper';
import { expectString } from '../scalars/expectString';
import { expectValue } from '../scalars/expectValue';
import { strictObjectMapper } from './strictObjectMapper';


const mapBook = strictObjectMapper(accessor => {
   accessor.get('_type_', expectValue('book'));
   return {
      title: accessor.get('title', expectString),
      author: accessor.get('author', expectString),
   };
});

type Book = ReturnType<typeof mapBook>;

const mapPerson = strictObjectMapper(accessor => {
   accessor.get('_type_', expectValue('person'));
   return {
      name: accessor.get('name', expectString),
      email: accessor.get('email', expectString),
   };
});

type Person = ReturnType<typeof mapPerson>;

const mapper = delegatingMapper<Book | Person>('_type_', {
   'book': mapBook,
   'person': mapPerson,
});

test('delegatingMapper', () => {
   const book = mapper({
      _type_: 'book',
      title: 'Pippi Langstrumpf',
      author: 'Astrid Lindgren',
   });
   expect(book).toEqual({
      title: 'Pippi Langstrumpf',
      author: 'Astrid Lindgren',
   });

   const person = mapper({
      _type_: 'person',
      name: 'Daniel Faber',
      email: 'daniel.faber@example.org',
   });
   expect(person).toEqual({
      name: 'Daniel Faber',
      email: 'daniel.faber@example.org',
   });
});

test('delegatingMapper fails on missing type', () => {
   expect(() => mapper({
      title: 'Pippi Langstrumpf',
      author: 'Astrid Lindgren',
   })).toThrowJsonMappingError('missing property "_type_" in jsonValue');
});

test('delegatingMapper fails on unexpected type', () => {
   expect(() => mapper({
      _type_: 'planet',
      title: 'Pippi Langstrumpf',
      author: 'Astrid Lindgren',
   })).toThrowJsonMappingError('one of "book", "person" expected in jsonValue._type_');
   expect(() => mapper({
      _type_: 42,
      title: 'Pippi Langstrumpf',
      author: 'Astrid Lindgren',
   })).toThrowJsonMappingError('one of "book", "person" expected in jsonValue._type_');
});
