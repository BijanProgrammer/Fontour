const fontsListElement = document.getElementsByClassName('fonts-list')[0];

let fontNames = [];

loadFontNames();

function loadFontNames() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '../config/font_names.txt', true);

	xhr.onload = function() {
		if (this.status == 200) {
			fontNames = this.responseText.split('\n');
			fontNames = fontNames.map((fontName) => fontName.trimRight());
			fontNames.splice(0, 3);

			fillFontsList();
		} else if ((this.status = 404)) {
			textElement.innerHTML = 'CODE 404: Not Found !';
		}
	};

	xhr.onerror = function() {
		console.error('REQUEST EROR');
	};

	xhr.send();
}

function fillFontsList() {
	// Limiting fonts for testing purposes
	// TODO: Remove limits
	const limit = 12;
	let loadedFontsCount = 0;

	for (const fontName of fontNames) {
		const rowElement = document.createElement('div');
		rowElement.setAttribute('class', 'fonts-list__row');

		const nameElement = document.createElement('pre');
		nameElement.setAttribute('class', 'fonts-list__row__name');
		nameElement.innerHTML = fontName;

		const textElement = document.createElement('pre');
		textElement.setAttribute('class', 'fonts-list__row__text');
		textElement.style.fontFamily = fontName;
		textElement.innerHTML = 'این متن آزمایشی است.';

		rowElement.appendChild(nameElement);
		rowElement.appendChild(textElement);
		fontsListElement.appendChild(rowElement);

		loadedFontsCount++;
		if (loadedFontsCount === 12) break;
	}
}
