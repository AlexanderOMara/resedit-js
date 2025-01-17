
export default interface BitmapInfo {
	width: number;
	height: number;
	planes: number;
	bitCount: number;
	compression: number;
	xPelsPerMeter: number;
	yPelsPerMeter: number;
	colorUsed: number;
	colorImportant: number;
	colors: { r: number; g: number; b: number; }[];
}
