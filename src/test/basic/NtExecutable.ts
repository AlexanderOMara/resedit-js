/// <reference types='jest' />

import NtExecutable, { NtExecutableSection } from '@/NtExecutable';
import ImageDirectoryEntry from '@/format/ImageDirectoryEntry';

// prettier-ignore
const DUMMY_EXECUTABLE_32 = new Uint8Array([
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x4c,0x01,0x01,0x00,
	0x6c,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xe0,0x00,0x02,0x21,
	0x0b,0x01,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x10,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x40,0x00,0x00,0x00,0x10,0x00,0x00,0x10,0x00,0x00,
	0x00,0x00,0x10,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
]);

// prettier-ignore
const DUMMY_EXECUTABLE_64 = new Uint8Array([
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x64,0x86,0x01,0x00,
	0x6d,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x00,0x22,0x20,
	0x0b,0x02,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x60,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
]);

const DUMMY_SECTION: NtExecutableSection = {
	info: {
		name: '.rsrc',
		virtualSize: 256,
		virtualAddress: 0,
		sizeOfRawData: 256,
		pointerToRawData: 0,
		pointerToRelocations: 0,
		pointerToLineNumbers: 0,
		numberOfRelocations: 0,
		numberOfLineNumbers: 0,
		characteristics: 0x40000040,
	},
	data: new ArrayBuffer(256),
};

describe('NtExecutable', () => {
	describe('32-bit binary', () => {
		it('should be parsed correctly', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32.buffer);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeTruthy();
			// the following data is specified in DUMMY_EXECUTABLE_32 data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
		});
		it('sections should be added', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32.buffer);
			expect(exe.getSectionByEntry(ImageDirectoryEntry.Debug)).toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Debug, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(ImageDirectoryEntry.Debug);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be replaced', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32.buffer);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be removed', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32.buffer);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, null);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).toBeNull();
		});
	});
	describe('64-bit binary', () => {
		it('should be parsed correctly', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64.buffer);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeFalsy();
			// the following data is specified in DUMMY_EXECUTABLE_32 data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
		});
		it('sections should be added', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64.buffer);
			expect(exe.getSectionByEntry(ImageDirectoryEntry.Debug)).toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Debug, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(ImageDirectoryEntry.Debug);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be replaced', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64.buffer);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be removed', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64.buffer);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, null);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).toBeNull();
		});
	});
});
