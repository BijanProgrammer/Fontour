let fontNames = [];

loadText();

function loadText() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '../config/font_names.txt', true);

	xhr.onload = function() {
		if (this.status == 200) {
			fontNames = this.responseText.split('\n');
			fontNames = fontNames.map((fontName) => fontName.trimRight());
			fontNames.splice(0, 3);
		} else if ((this.status = 404)) {
			textElement.innerHTML = 'CODE 404: Not Found !';
		}
	};

	xhr.onerror = function() {
		console.error('REQUEST EROR');
	};

	xhr.send();
}
