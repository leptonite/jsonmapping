/**
 * Converts an `ArrayBuffer` to a string in hex format.
 */
export function arrayBufferToHexString(arrayBuffer: ArrayBuffer): string {
   return new Uint8Array(arrayBuffer).reduce((s, b) => s + (b < 16 ? '0' : '') + b.toString(16), '');
}
