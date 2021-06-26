const width = 400;
const height = width / 2; //Math.round((width * 2) / 3);
let posX = -2;
let posY = -1;
let posW = 4;
let posH = 2;
const zoomScale = 2;

function setup() {
	createCanvas(width, height);
	pixelDensity(1);
	loadPixels();
	frameRate(30);
	_redraw();
}

// function draw() {
// 	const a = map(mouseX, 0, width, posX, posX + posW);
// 	const b = map(mouseY, 0, height, posY, posY + posH);
// 	_redraw(a, b);
// }

function _redraw(ca, cb) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const a = map(x, 0, width, posX, posX + posW);
			const b = map(y, 0, height, posY, posY + posH);
			// console.log(a, b)
			// const interations = iterate(
			// 	-Math.abs(a) - 0.83,
			// 	Math.abs(b) - .4,
			// 	ca || -Math.abs(a) - 0.83,
			// 	cb || Math.abs(b) - .4,
			// 	500
			//);
			
			//const iterations = iterate(Math.abs(a) - 0.7, -b, Math.abs(a) - 0.7, -b, 500);
			const iterations = iterate(a, b, a, b, 500);
			// console.log(interations);
			let pixelCol = color(`hsla(${(iterations * 30 + 120) % 255}, 100%, 50%, 0.7)`);
			if (iterations < 1) pixelCol = color(0, 0, 0, 255);

			set(x, y, pixelCol);
		}
	}
	updatePixels();
}

function iterate(a, b, origA, origB, depth) {
	if (depth < 1) return 0;

	const newA = a * a - b * b + origA;
	const newB = 2 * a * b + origB;

	// const newA = b * b + b * a + origB;
	// const newB = a;

	// heart
	//	const newA = a * a - b * b * b + origA;
	// const newB = 2 * a * b + origB;
	//			const iterations = iterate(Math.abs(a)-.7, -b, Math.abs(a)-.7, -b, 500);

	// X
	// const newA = a * a * a + b * b + origA;
	// const newB = 2 * a * b + origB;
	// const iterations = iterate(
	// 	(-Math.abs(a) - 0.17) / 1.5,
	// 	b * 1.5,
	// 	(-Math.abs(a) - 0.17) / 1.5,
	// 	b * 1.5,
	// 	500
	// );
	if (newA * newA + newB * newB > 4) return depth;
	return iterate(newA, newB, origA, origB, depth - 1);
}

function mousePressed() {
	const a = map(mouseX, 0, width, posX, posX + posW);
	const b = map(mouseY, 0, height, posY, posY + posH);
	console.log(a, b);
	posW /= zoomScale;
	posH /= zoomScale;
	posX = a - posW / 2;
	posY = b - posH / 2;
	_redraw();
}

function keyPressed() {
	switch (keyCode) {
		case RIGHT_ARROW:
			posX += posW / 3;
			_redraw();
			break;
		case LEFT_ARROW:
			posX -= posW / 3;
			_redraw();
			break;
		case UP_ARROW:
			posY -= posH / 3;
			_redraw();
			break;
		case DOWN_ARROW:
			posY += posH / 3;
			_redraw();
			break;
		case ESCAPE:
			posX += posW / 2;
			posY += posH / 2;
			posW *= zoomScale;
			posH *= zoomScale;
			posX -= posW / 2;
			posY -= posH / 2;
			_redraw();
			break;
		case 82:
			posX = -2;
			posY = -1;
			posW = 4;
			posH = 2;
			_redraw();
			break;

		default:
			break;
	}
}
