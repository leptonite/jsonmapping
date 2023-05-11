import { JsonMappingError } from '../JsonMappingError';
import type { JsonMapper } from '../types/JsonMapper';


const parseErrorMessage = 'date and time in ISO 8601 format expected';

/**
 * Expects the given `JsonValue` to be a string containing an ISO formatted date and time
 * (e. g. `2017-12-31T23:59:59.999Z`) and converts it to a `Date` object.
 */
export const dateFromJSON: JsonMapper<Date> = jsonValue => {
   if (typeof jsonValue !== 'string') {
      throw new JsonMappingError(parseErrorMessage);
   }

   const match = /^(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})T(?<hour>[0-9]{2}):(?<minute>[0-9]{2}):(?<second>[0-9]{2})(?:\.[0-9]{1,3})?Z$/u.exec(jsonValue);
   if (!match) {
      throw new JsonMappingError(parseErrorMessage);
   }

   const year = parseInt(match.groups!['year']!, 10);
   const month = parseInt(match.groups!['month']!, 10);
   const day = parseInt(match.groups!['day']!, 10);
   const hour = parseInt(match.groups!['hour']!, 10);
   const minute = parseInt(match.groups!['minute']!, 10);
   const second = parseInt(match.groups!['second']!, 10);

   if (day < 1 || day > daysInMonth(year, month) || hour > 60 || minute > 60 || second > 60) {
      throw new JsonMappingError(parseErrorMessage);
   }

   return new Date(jsonValue);
};

function daysInMonth(year: number, month: number): 28 | 29 | 30 | 31 {
   switch (month) {
      case 1: return 31;
      case 2: return isLeapYear(year) ? 29 : 28;
      case 3: return 31;
      case 4: return 30;
      case 5: return 31;
      case 6: return 30;
      case 7: return 31;
      case 8: return 31;
      case 9: return 30;
      case 10: return 31;
      case 11: return 30;
      case 12: return 31;
      default: throw new JsonMappingError(parseErrorMessage);
   }
}

function isLeapYear(year: number): boolean {
   return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
