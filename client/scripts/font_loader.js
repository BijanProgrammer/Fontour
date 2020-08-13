const fontsListElement = document.getElementsByClassName('fonts-list')[0];

let fontNames = [];

loadFontNames();

function loadFontNames() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:5000', true);

	xhr.onload = function () {
		if (this.status == 200) {
			fontNames = this.responseText.split('\n');
			fontNames = fontNames.map((fontName) => fontName.trimRight());

			fillFontsList();
		}
	};

	xhr.send();
}

function fillFontsList() {
	let rowElements = [];

	for (const fontName of fontNames) {
		const rowElement = document.createElement('div');
		rowElement.setAttribute('class', 'fonts-list__row');

		const nameElement = document.createElement('pre');
		nameElement.setAttribute('class', 'fonts-list__row__name');
		nameElement.innerHTML = fontName;

		const textElement = document.createElement('pre');
		textElement.setAttribute('class', 'fonts-list__row__text');
		textElement.style.fontFamily = '"' + fontName.substring(3) + '"';
		textElement.innerHTML = 'این متن آزمایشی است.';

		rowElement.appendChild(nameElement);
		rowElement.appendChild(textElement);
		fontsListElement.appendChild(rowElement);

		rowElements.push(rowElement);
	}

	groupFonts(fontsListElement, rowElements);
}
