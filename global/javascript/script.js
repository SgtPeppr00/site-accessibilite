const animatedicon = document.querySelector(".animated-icon");
const navsidebar = document.querySelector(".navsidebar");
const backdropaccueil = document.querySelector("#backdropaccueil");

document
	.querySelector(".navbar-toggler")
	.addEventListener("click", function () {
		animatedicon.classList.toggle("open");
		navsidebar.classList.toggle("open");
	});

const checkbox = document.getElementById("checkbox");
const checkboxMobile = document.getElementById("checkboxmobile");
const circles = document.querySelectorAll(".circle");
const burgerspan = document.querySelectorAll(".burgerspan");
const linkdark = document.querySelectorAll(".link-dark");
const pinkButtons = document.querySelectorAll(".pink-button");

let isDarkTheme = localStorage.getItem("darkTheme") === "true";

checkboxMobile.addEventListener("change", changeTheme);
checkbox.addEventListener("change", changeTheme);

// Set initial checkbox state based on stored theme
checkbox.checked = isDarkTheme;
checkboxMobile.checked = isDarkTheme;

function applyTheme(isDark) {
	if (!isDark) {
		document.body.style.backgroundColor = "";
		document.body.style.color = "";
		navsidebar.style.background = "";
		navsidebar.style.borderColor = "black";
		if (backdropaccueil) {
			console.log(backdropaccueil);
			backdropaccueil.style.boxShadow =
				"inset 0 -50px 100px -5px white, inset 0 50px 100px -5px white";
		}
		circles.forEach((circle) => {
			circle.style.borderColor = "black";
		});
		burgerspan.forEach((span) => {
			span.style.backgroundColor = "black";
		});
		linkdark.forEach((link) => {
			link.classList.add("link-dark");
			link.classList.remove("link-light");
		});
		pinkButtons.forEach((button) => {
			button.style.backgroundColor = "#BD1D59";
		});
	} else {
		document.body.style.background = "black";
		document.body.style.color = "white";
		navsidebar.style.background = "black";
		navsidebar.style.borderColor = "white";
		if (backdropaccueil) {
			backdropaccueil.style.boxShadow =
				"inset 0 -50px 100px -5px black, inset 0 50px 100px -5px black";
		}
		circles.forEach((circle) => {
			circle.style.borderColor = "white";
		});
		burgerspan.forEach((span) => {
			span.style.background = "white";
		});
		linkdark.forEach((link) => {
			link.classList.remove("link-dark");
			link.classList.add("link-light");
		});
		pinkButtons.forEach((button) => {
			button.style.backgroundColor = "#D76891";
		});
	}
}

function changeTheme() {
	isDarkTheme = !isDarkTheme;
	localStorage.setItem("darkTheme", isDarkTheme);
	applyTheme(isDarkTheme);
}

// Apply theme on page load
applyTheme(isDarkTheme);

function addEventToCursorCircle(element) {
	element.addEventListener("mouseover", () => {
		element.style.cursor = "pointer";
		cursorCircle.style.transform = "scale(2)";
		cursorCircle.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
	});
	element.addEventListener("mouseleave", () => {
		cursorCircle.style.transform = "scale(1)";
		cursorCircle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	});
}
const cursorCircle = document.createElement("div");

function setupCursorCircle() {
	cursorCircle.style.cssText = `
						z-index: 9999;
						position: fixed;
						width: 30px;
						height: 30px;
						border-radius: 50%;
						background-color: rgba(0, 0, 0, 0.5);
						pointer-events: none;
						transition: transform 0.2s ease;
					`;
	document.body.appendChild(cursorCircle);

	function handleMouseMove(event) {
		const xoffset = 15;
		const yoffset = 15;
		const y = event.pageY;
		const x = event.pageX;
		const ref = cursorCircle;
		const scrollLeft =
			window.scrollX !== undefined
				? window.scrollX
				: (
						document.documentElement ||
						document.body.parentNode ||
						document.body
				  ).scrollLeft;
		const scrollTop =
			window.scrollY !== undefined
				? window.scrollY
				: (
						document.documentElement ||
						document.body.parentNode ||
						document.body
				  ).scrollTop;
		ref.style.left = x - scrollLeft - xoffset + "px";
		ref.style.top = y - scrollTop - yoffset + "px";
	}

	document.addEventListener("mousemove", handleMouseMove, false);
	document.addEventListener("mouseleave", () => {
		cursorCircle.style.display = "none";
	});
	document.addEventListener("mouseenter", () => {
		cursorCircle.style.display = "block";
	});
}

document.addEventListener("DOMContentLoaded", () => {
	setupCursorCircle();
	document
		.querySelectorAll(
			"a, button, input, img, .button-group .button, .button-info, input, .slider"
		)
		.forEach((element) => {
			addEventToCursorCircle(element);
		});
});
