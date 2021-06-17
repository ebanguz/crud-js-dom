const d = document;
export default function formValidation() {
	const $form = d.querySelector('form');
	// Select all inputs that are not radio buttons or select
	const inputsForKeyupValidation = 'form [required]:not(.form__radio)';
	const $inputs = d.querySelectorAll(inputsForKeyupValidation);

	$inputs.forEach((input) => {
		const $span = d.createElement('span');
		$span.classList.add('contact-form-error');
		$span.textContent = input.title;
		$span.id = input.name;
		input.insertAdjacentElement('afterend', $span);
	});

	d.addEventListener('keyup', (e) => {
		if (e.target.matches(inputsForKeyupValidation)) {
			const input = e.target;
			const pattern = input.pattern || input.dataset.pattern;
			const span = d.getElementById(input.name);

			if (pattern && input.value !== '') {
				let regex = new RegExp(pattern);
				return !regex.exec(input.value) ? span.classList.add('is-active') : span.classList.remove('is-active');
			}
		}
	});
}
