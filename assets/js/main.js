import formValidation from './form-validation.js';
//Falta agregar id de Update

document.addEventListener('DOMContentLoaded', () => {
	const d = document;
	const $overlay = d.querySelector('.overlay');
	const $form = d.querySelector('.form');
	const $template = document.querySelector('#template-row').content;
	const $fragmento = new DocumentFragment();
	const $tableBody = d.querySelector('.table__body');
	let isUpdate = false;
	let idUser;

	const users = [
		{name: 'Oscar', email: 'oscar@gmail.com', gender: 'M', role: 'Member', status: 'Active'},
		{name: 'Jessica', email: 'jessy@gmail.com', gender: 'F', role: 'Admin', status: 'Active'},
	];

	function renderData() {
		$tableBody.innerHTML = '';

		users.forEach((user, index) => {
			$template.querySelector('img').setAttribute('src', `img/${user.gender}.png`);
			$template.querySelector('.name').textContent = user.name;
			$template.querySelector('.email').textContent = user.email;
			$template.querySelector('.table__cell--gender').textContent = user.gender;
			$template.querySelector('.table__cell--role').textContent = user.role;
			$template.querySelector('.table__cell--status span').textContent = user.status;
			const spanClass = user.status.toLowerCase();
			$template.querySelector('.table__cell--status span').className = spanClass;
			$template.querySelector('.btn--edit').dataset.id = index;
			$template.querySelector('.btn--delete').dataset.id = index;

			let clone = document.importNode($template, true);
			$fragmento.appendChild(clone);
		});

		$tableBody.appendChild($fragmento);
	}

	function createUser(data) {
		const {name, email, gender, role, status} = data;
		const user = {
			name,
			email,
			gender,
			role,
			status,
		};

		users.push(user);
		renderData();
	}

	function updateUser(index, data) {
		const {name, email, gender, role, status} = data;
		const user = {
			name,
			email,
			gender,
			role,
			status,
		};

		users.splice(index, 1, user);
		renderData();
	}

	function deleteUser(index) {
		users.splice(index, 1);
		renderData();
	}

	function cleanInputs() {
		$form.name.value = '';
		$form.email.value = '';
		$form.role.selectedIndex = 0;
		$form.status[1].checked = true;

		for (const input of $form.gender) {
			input.checked = false;
		}
	}

	function putValueOnForm(id) {
		$overlay.classList.toggle('none');
		$form.name.value = users[id].name;
		$form.email.value = users[id].email;

		for (const input of $form.gender) {
			input.value === users[id].gender && (input.checked = true);
		}

		$form.role.value = users[id].role;

		for (const input of $form.status) {
			input.value === users[id].status && (input.checked = true);
		}
		isUpdate = true;
	}

	d.addEventListener('click', (e) => {
		if (e.target.matches('.btn-add') || e.target.matches('.overlay')) {
			$overlay.classList.toggle('none');
			cleanInputs();
		}
		if (e.target.matches('.btn--action')) {
			e.target.classList.toggle('show');
		}

		if (e.target.matches('.btn--delete')) {
			deleteUser(e.target.dataset.id);
		}
		if (e.target.matches('.btn--edit')) {
			putValueOnForm(e.target.dataset.id);
			idUser = e.target.dataset.id;
		}
	});

	d.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData($form);
		const entries = formData.entries();
		const data = Object.fromEntries(entries);

		if (!isUpdate) {
			createUser(data);
		} else {
			updateUser(idUser, data);
			isUpdate = false;
		}

		cleanInputs();
	});

	// MAIN LOGIC
	renderData();
	formValidation();
});
