export default function cleanInputs() {
	const $form = document.querySelector('.form');
	document.querySelector('#user-id').value = '';
	$form.name.value = '';
	$form.email.value = '';
	$form.role.selectedIndex = 0;
	$form.status[1].checked = true;

	for (const input of $form.gender) {
		input.checked = false;
	}
}
