export function enumNumberValueSet(theEnum: Record<string, string | number>): Set<string> {
   const numberValues = new Set<string>();
   for (const prop in theEnum) {
      if (!Object.prototype.hasOwnProperty.call(theEnum, prop)) {
         throw new Error('argument is not a typescript enum because it has a prototype with enumerable properties');
      }
      const value = theEnum[prop];
      if (typeof value === 'number') {
         numberValues.add(value.toString());
      } else if (typeof value !== 'string') {
         throw new Error('argument is not a typescript enum because it has a property which is not of type number and not of type string');
      }
   }
   return numberValues;
}
