// a : 'کاملاً رسمی'
// b : 'رسمی'
// f : 'فانتزی'
// h : 'دست‌خط'
// c : 'گرد'
// p : 'پیکسلی'
// s : 'خاص'
// r : 'حذفی'
// u : 'نامشخص'

const GROUP_NAMES = {
	a: 'serif',
	b: 'sans-serif',
	f: 'fantasy',
	h: 'handwriting',
	c: 'cursive',
	p: 'pixel',
	s: 'special',
	r: 'remove',
	u: 'unknown'
};

const GROUP_ELEMENTS = {};

const groupChangerElement = document.getElementById('group-changer');
let clickedRowElement;

function groupFonts(fontsListElement, rows) {
	for (const groupName in GROUP_NAMES) {
		GROUP_ELEMENTS[groupName] = document.createElement('div');
		GROUP_ELEMENTS[groupName].setAttribute('class', 'fonts-list--' + GROUP_NAMES[groupName]);

		const groupNameElement = document.createElement('h2');
		groupNameElement.classList.add('close');
		groupNameElement.innerHTML = GROUP_NAMES[groupName];
		groupNameElement.addEventListener('click', toggleGroup);

		GROUP_ELEMENTS[groupName].appendChild(groupNameElement);
		fontsListElement.appendChild(GROUP_ELEMENTS[groupName]);

		const groupChangerOptionElement = document.createElement('span');
		groupChangerOptionElement.innerHTML = GROUP_NAMES[groupName];
		groupChangerOptionElement.addEventListener('click', (event) => {
			event.preventDefault();
			changeGroup(groupName);
		});

		groupChangerElement.appendChild(groupChangerOptionElement);
	}

	for (const row of rows) {
		const nameElement = row.getElementsByClassName('fonts-list__row__name')[0];

		const fontName = nameElement.textContent;

		GROUP_ELEMENTS[fontName.charAt(1)].appendChild(row);

		nameElement.textContent = fontName.substring(3);

		row.addEventListener('click', toggleGroupChanger);
	}
}

function changeGroup(groupName) {
	if (clickedRowElement == null) return;

	GROUP_ELEMENTS[groupName].appendChild(clickedRowElement);

	updateFontNames();
}

function updateFontNames() {
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://localhost:5000/update', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

	xhr.send(JSON.stringify({ content: stringifyFontNames() }));
}

function stringifyFontNames() {
	let result = [];

	for (const groupElementName in GROUP_ELEMENTS) {
		const groupElement = GROUP_ELEMENTS[groupElementName];

		const groupFullName = groupElement.getElementsByTagName('h2')[0].textContent;

		const groupName = Object.keys(GROUP_NAMES).find(
			(key) => GROUP_NAMES[key] === groupFullName
		);

		for (const row of groupElement.getElementsByClassName('fonts-list__row')) {
			result.push('#' + groupName + ' ' + row.getElementsByTagName('pre')[0].textContent);
		}
	}

	result.sort();

	return result.join('\n');
}

function toggleGroup(event) {
	let clickedGroupElement = event.target;

	clickedGroupElement.classList.toggle('close');
}

function toggleGroupChanger(event) {
	if (event.target !== clickedRowElement &&
		event.target.parentElement !== clickedRowElement) {
		if (clickedRowElement != null)
			clickedRowElement.classList.remove('fonts-list__row--active');

		groupChangerElement.classList.add('open');

		// Find clickedRowElement
		clickedRowElement = event.target;
		if (event.target.className !== 'fonts-list__row')
			clickedRowElement = event.target.parentElement;

		console.log(event);
		// Set position of the element
		const mouseX = event.clientX + document.documentElement.scrollLeft;
		const mouseY = event.clientY + document.documentElement.scrollTop;
		const MenuHeight = groupChangerElement.offsetHeight;

		groupChangerElement.style.left = (mouseX + 5).toString() + 'px';

		if (event.clientY + MenuHeight < window.innerHeight) {
			groupChangerElement.style.top = (mouseY + 5).toString() + 'px';

			groupChangerElement.classList.remove('opened-from-bottom');
			groupChangerElement.classList.add('opened-from-top');
		}
		else {
			groupChangerElement.style.top = (mouseY - MenuHeight).toString() + 'px';

			groupChangerElement.classList.remove('opened-from-top');
			groupChangerElement.classList.add('opened-from-bottom');
		}

		// Highlights clicked row
		clickedRowElement.classList.add('fonts-list__row--active');
	} else {
		groupChangerElement.classList.remove('open');
		clickedRowElement.classList.remove('fonts-list__row--active');

		clickedRowElement = null;
	}
}

window.onclick = function (event) {
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
