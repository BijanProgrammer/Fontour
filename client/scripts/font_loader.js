const SAMPLE_TEXT = `این یک متن آزمایشی است !؟
1234567890`;

const fontsListElement = document.getElementsByClassName('wrapper')[0];

let fontNames = [];
let allFontNames = [];

loadFontNames();

function loadFontNames() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:5000', true);

	xhr.onload = function () {
		if (this.status == 200) {
			fontNames = this.responseText.split('\n').map((fontName) => fontName.trimRight());
			loadAllFontNames();
		}
	};

	xhr.send();
}

function loadAllFontNames() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:5000/all', true);

	xhr.onload = function () {
		if (this.status == 200) {
			allFontNames = this.responseText
				.split('\n')
				.map((fontName) => fontName.trimRight())
				.filter(
					(value) =>
						value.search(/(italic|bold|black|heavy|medium|light|narrow|thin)/i) === -1
				);

			fillFontsList();
		}
	};

	xhr.send();
}

function fillFontsList() {
	let rowElements = [];

	for (const fontName of fontNames) {
		const index = allFontNames.indexOf(fontName.substring(3));
		if (index >= 0) allFontNames.splice(index, 1);
		else console.warn(`Cannot find ${fontName}`);

		rowElements.push(createFontElement(fontName));
	}

	console.log(`not sorted: ${allFontNames.length}`);

	for (let i = 0; i < Math.min(50, allFontNames.length); i++)
		rowElements.push(createFontElement(`#u ${allFontNames[i]}`));

	groupFonts(fontsListElement, rowElements);
}

function createFontElement(fontName) {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('class', 'fonts-list__row');

	const nameElement = document.createElement('pre');
	nameElement.setAttribute('class', 'fonts-list__row__name');
	nameElement.innerHTML = fontName;

	const textElement = document.createElement('pre');
	textElement.setAttribute('class', 'fonts-list__row__text');
	textElement.style.fontFamily = '"' + fontName.substring(3) + '"';
	textElement.innerHTML = SAMPLE_TEXT;

	rowElement.appendChild(nameElement);
	rowElement.appendChild(textElement);
	fontsListElement.appendChild(rowElement);

	return rowElement;
}
