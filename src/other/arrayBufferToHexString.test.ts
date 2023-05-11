import { expect, test } from '@jest/globals';

import { arrayBufferToHexString } from './arrayBufferToHexString';


test('arrayBufferToHexString empty', () => {
   const buffer = Uint8Array.of().buffer;
   expect(arrayBufferToHexString(buffer)).toBe('');
});

test('arrayBufferToHexString 4 bytes', () => {
   const buffer = Uint8Array.of(0x1a, 0x03, 0xdf, 0x0f).buffer;
   expect(arrayBufferToHexString(buffer)).toBe('1a03df0f');
});
