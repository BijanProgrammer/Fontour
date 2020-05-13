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

const groupChangerElement = document.getElementById('group-changer');
let clickedRowElement;

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

		const groupChangerOptionElement = document.createElement('span');
		groupChangerOptionElement.innerHTML = GROUP_NAMES[groupName];
		groupChangerElement.appendChild(groupChangerOptionElement);
	}

	for (const row of rows) {
		const nameElement = row.getElementsByClassName(
			'fonts-list__row__name'
		)[0];

		const fontName = nameElement.textContent;

		GROUP_ELEMENTS[fontName.charAt(1)].appendChild(row);

		nameElement.textContent = fontName.substring(3);

		row.addEventListener('click', changeGroup);
	}
}

function changeGroup(event) {
	if (
		event.target !== clickedRowElement &&
		event.target.parentElement !== clickedRowElement
	) {
		if (clickedRowElement != null)
			clickedRowElement.classList.remove('fonts-list__row--active');

		groupChangerElement.classList.add('open');

		groupChangerElement.style.left = (event.pageX + 5).toString() + 'px';
		groupChangerElement.style.top = (event.pageY + 5).toString() + 'px';

		clickedRowElement = event.target;
		if (event.target.className !== 'fonts-list__row')
			clickedRowElement = event.target.parentElement;

		clickedRowElement.classList.add('fonts-list__row--active');
	} else {
		groupChangerElement.classList.remove('open');
		clickedRowElement.classList.remove('fonts-list__row--active');

		clickedRowElement = null;
	}
}

window.onclick = function(event) {
	if (
		!event.target.matches('.fonts-list__row') &&
		!event.target.parentElement.matches('.fonts-list__row')
	) {
		groupChangerElement.classList.remove('open');

		if (clickedRowElement != null)
			clickedRowElement.classList.remove('fonts-list__row--active');

		clickedRowElement = null;
	}
};
