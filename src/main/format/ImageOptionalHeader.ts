
import FormatBase from './FormatBase';

export default class ImageOptionalHeader extends FormatBase {
	private constructor(view: DataView) {
		super(view);
	}

	public static from(bin: ArrayBuffer, offset = 0) {
		return new ImageOptionalHeader(new DataView(bin, offset, 96));
	}
	public static readonly size = 96;
	public static readonly DEFAULT_MAGIC = 0x10b;

	public get magic() { return this.view.getUint16(0, true); }
	public set magic(val: number) { this.view.setUint16(0, val, true); }
	public get majorLinkerVersion() { return this.view.getUint8(2); }
	public get minorLinkerVersion() { return this.view.getUint8(3); }
	public get sizeOfCode() { return this.view.getUint32(4, true); }
	public set sizeOfCode(val: number) { this.view.setUint32(4, val, true); }
	public get sizeOfInitializedData() { return this.view.getUint32(8, true); }
	public set sizeOfInitializedData(val: number) { this.view.setUint32(8, val, true); }
	public get sizeOfUninitializedData() { return this.view.getUint32(12, true); }
	public set sizeOfUninitializedData(val: number) { this.view.setUint32(12, val, true); }
	public get addressOfEntryPoint() { return this.view.getUint32(16, true); }
	public set addressOfEntryPoint(val: number) { this.view.setUint32(16, val, true); }
	public get baseOfCode() { return this.view.getUint32(20, true); }
	public set baseOfCode(val: number) { this.view.setUint32(20, val, true); }
	public get baseOfData() { return this.view.getUint32(24, true); }
	public set baseOfData(val: number) { this.view.setUint32(24, val, true); }

	public get imageBase() { return this.view.getUint32(28, true); }
	public set imageBase(val: number) { this.view.setUint32(28, val, true); }
	public get sectionAlignment() { return this.view.getUint32(32, true); }
	public set sectionAlignment(val: number) { this.view.setUint32(32, val, true); }
	public get fileAlignment() { return this.view.getUint32(36, true); }
	public set fileAlignment(val: number) { this.view.setUint32(36, val, true); }
	public get majorOperatingSystemVersion() { return this.view.getUint16(40, true); }
	public set majorOperatingSystemVersion(val: number) { this.view.setUint16(40, val, true); }
	public get minorOperatingSystemVersion() { return this.view.getUint16(42, true); }
	public set minorOperatingSystemVersion(val: number) { this.view.setUint16(42, val, true); }
	public get majorImageVersion() { return this.view.getUint16(44, true); }
	public set majorImageVersion(val: number) { this.view.setUint16(44, val, true); }
	public get minorImageVersion() { return this.view.getUint16(46, true); }
	public set minorImageVersion(val: number) { this.view.setUint16(46, val, true); }
	public get majorSubsystemVersion() { return this.view.getUint16(48, true); }
	public set majorSubsystemVersion(val: number) { this.view.setUint16(48, val, true); }
	public get minorSubsystemVersion() { return this.view.getUint16(50, true); }
	public set minorSubsystemVersion(val: number) { this.view.setUint16(50, val, true); }
	public get win32VersionValue() { return this.view.getUint32(52, true); }
	public set win32VersionValue(val: number) { this.view.setUint32(52, val, true); }
	public get sizeOfImage() { return this.view.getUint32(56, true); }
	public set sizeOfImage(val: number) { this.view.setUint32(56, val, true); }
	public get sizeOfHeaders() { return this.view.getUint32(60, true); }
	public set sizeOfHeaders(val: number) { this.view.setUint32(60, val, true); }
	public get checkSum() { return this.view.getUint32(64, true); }
	public set checkSum(val: number) { this.view.setUint32(64, val, true); }
	public get subsystem() { return this.view.getUint16(68, true); }
	public set subsystem(val: number) { this.view.setUint16(68, val, true); }
	public get dllCharacteristics() { return this.view.getUint16(70, true); }
	public set dllCharacteristics(val: number) { this.view.setUint16(70, val, true); }
	public get sizeOfStackReserve() { return this.view.getUint32(72, true); }
	public set sizeOfStackReserve(val: number) { this.view.setUint32(72, val, true); }
	public get sizeOfStackCommit() { return this.view.getUint32(76, true); }
	public set sizeOfStackCommit(val: number) { this.view.setUint32(76, val, true); }
	public get sizeOfHeapReserve() { return this.view.getUint32(80, true); }
	public set sizeOfHeapReserve(val: number) { this.view.setUint32(80, val, true); }
	public get sizeOfHeapCommit() { return this.view.getUint32(84, true); }
	public set sizeOfHeapCommit(val: number) { this.view.setUint32(84, val, true); }
	public get loaderFlags() { return this.view.getUint32(88, true); }
	public set loaderFlags(val: number) { this.view.setUint32(88, val, true); }
	public get numberOfRvaAndSizes() { return this.view.getUint32(92, true); }
	public set numberOfRvaAndSizes(val: number) { this.view.setUint32(92, val, true); }
}
