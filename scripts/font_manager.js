// a : 'کاملاً رسمی'
// b : 'رسمی'
// f : 'فانتزی'
// h : 'دست‌خط'
// c : 'گرد'
// p : 'پیکسلی'
// u : 'نامشخص'

const GROUP_NAMES = {
	a : 'serif',
	b : 'sans-serif',
	f : 'fantasy',
	h : 'handwriting',
	c : 'cursive',
	p : 'pixel',
	u : 'unknown'
};

const GROUP_ELEMENTS = {};

function groupFonts(fontsListElement, rows) {
	for (const groupName in GROUP_NAMES) {
		GROUP_ELEMENTS[groupName] = document.createElement('div');
		GROUP_ELEMENTS[groupName].setAttribute(
			'class',
			'fonts-list--' + GROUP_NAMES[groupName]
		);

		const groupNameElement = document.createElement('h2');
		groupNameElement.innerHTML = GROUP_NAMES[groupName];

		GROUP_ELEMENTS[groupName].appendChild(groupNameElement);
		fontsListElement.appendChild(GROUP_ELEMENTS[groupName]);
	}

	for (const row of rows) {
		const nameElement = row.getElementsByClassName(
			'fonts-list__row__name'
		)[0];

		const fontName = nameElement.textContent;

		// const textElementClasses = textElement.getAttribute('class').split(' ');

		GROUP_ELEMENTS[fontName.charAt(1)].appendChild(row);

		nameElement.textContent = fontName.substring(3);
	}
}
