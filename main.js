const mainContainer = document.getElementById("container");
const myForm = mainContainer.querySelector("#myForm");
const email = myForm.querySelector(".email");
const radioCheck = myForm.querySelectorAll("input[type = 'radio']");
const radioContainer = myForm.querySelector(".form-query-container");
const radioError = radioContainer.lastElementChild;
const checkboxContainer = myForm.querySelector(".checkbox-container");
const checkbox = checkboxContainer.querySelector("input");
const checkboxError = checkboxContainer.nextElementSibling;
const alertMessage = document.getElementById("alert-message");

// INPUTS VALIDATION
const inputs = myForm.querySelectorAll(".name");
inputs.forEach((input) => {
	const inputError = input.nextElementSibling;
	input.addEventListener("input", () => {
		if (input.value.trim()) {
			input.classList.remove("error-border");
			inputError.style.display = "none";
			input.value =
				input.value.trim().charAt(0).toUpperCase() +
				input.value.trim().slice(1);
		}
	});
});

//TEXTAREA VALIDATION
const textArea = myForm.querySelector("#message");
const textAreaError = textArea.nextElementSibling;
textArea.addEventListener("input", () => {
	if (textArea.value.trim()) {
		textArea.classList.remove("error-border");
		textAreaError.style.display = "none";
	}
});

//EMAIL VALIDATION
const invalidMail = email.nextElementSibling;
const requiredMail = invalidMail.nextElementSibling;
const emailInput = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
email.addEventListener("input", () => {
	if (email.value.trim()) {
		email.classList.remove("error-border");
		requiredMail.style.display = "none";
		invalidMail.style.display = "none";
	}
});

//RADIO CHECK
radioCheck.forEach((input) => {
	input.addEventListener("change", () => {
		radioError.style.display = "none";
	});
});

//CHECKBOX VALIDATION
checkbox.addEventListener("change", () => {
	checkboxError.style.display = "none";
});

// || SUBMITTTED VALIDATION
myForm.addEventListener("submit", (evt) => {
	evt.preventDefault();
	let isTrue = true;

	inputs.forEach((input) => {
		const inputError = input.nextElementSibling;
		if (input.value.trim() === "") {
			input.classList.add("error-border");
			inputError.classList.add("error-text");
			inputError.style.display = "inline";
			isTrue = false;
		}
	});

	if (textArea.value.trim() === "") {
		textArea.classList.add("error-border");
		textAreaError.classList.add("error-text");
		textAreaError.style.display = "inline";
		isTrue = false;
	}

	if (email.value.trim() === "") {
		email.classList.add("error-border");
		requiredMail.classList.add("error-text");
		requiredMail.style.display = "inline";
		invalidMail.style.display = "none";
		isTrue = false;
	} else if (!emailInput.test(email.value.trim())) {
		email.classList.add("error-border");
		invalidMail.classList.add("error-text");
		invalidMail.style.display = "inline";
		requiredMail.style.display = "none";
		isTrue = false;
	}

	const isChecked = [...radioCheck].some((input) => input.checked);
	if (!isChecked) {
		radioError.classList.add("error-text");
		radioError.style.display = "inline";
		isTrue = false;
	}

	if (!checkbox.checked) {
		checkboxError.classList.add("error-text");
		checkboxError.style.display = "inline";
		isTrue = false;
	}

	if (isTrue) {
		alertMessage.offsetHeight;
		alertMessage.classList.add("show");
		alertMessage.style.display = "flex";
		mainContainer.style.setProperty("margin", "10.5rem auto");
		setTimeout(() => {
			alertMessage.classList.remove("show");
			setTimeout(() => {
				alertMessage.style.display = "none";
				mainContainer.style.setProperty("margin", "");
			}, 400);
		}, 3000);
	} else {
		alertMessage.style.display = "none";
		mainContainer.style.setProperty("margin", "");
	}
});
