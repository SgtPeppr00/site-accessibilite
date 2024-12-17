// DOM Elements
const elements = {
	animatedIcon: document.querySelector(".animated-icon"),
	navSidebar: document.querySelector(".navsidebar"),
	backdropAccueil: document.querySelector("#backdropaccueil"),
	checkbox: document.getElementById("checkbox"),
	checkboxMobile: document.getElementById("checkboxmobile"),
	circles: document.querySelectorAll(".circle"),
	burgerSpans: document.querySelectorAll(".burgerspan"),
	linkDark: document.querySelectorAll(".link-dark"),
	pinkButtons: document.querySelectorAll(".pink-button"),
	themeSwitch: document.querySelector(".theme-switch"),
	carouselIndicators: document.querySelectorAll(
		".carousel-indicators [data-bs-target]"
	),
	carouselControls: document.querySelectorAll(
		".carousel-control-next-icon, .carousel-control-prev-icon"
	),
};

// Theme Management
const themeColors = {
	light: {
		background: "",
		text: "",
		buttonBg: "#BD1D59",
		cursorBg: "rgba(0, 0, 0, 0.5)",
		borderColor: "black",
	},
	dark: {
		background: "black",
		text: "white",
		buttonBg: "#D76891",
		cursorBg: "rgba(255, 255, 255, 0.5)",
		borderColor: "white",
	},
};

let isDarkTheme = localStorage.getItem("darkTheme") === "true";

// Theme Functions
function applyTheme(isDark) {
	const theme = isDark ? themeColors.dark : themeColors.light;

	document.body.style.background = theme.background;
	document.body.style.color = theme.text;
	elements.navSidebar.style.background = theme.background;
	elements.navSidebar.style.borderColor = theme.borderColor;
	cursorCircle.style.backgroundColor = theme.cursorBg;

	if (elements.backdropAccueil) {
		elements.backdropAccueil.style.boxShadow = isDark
			? `inset 0 -50px 100px -5px ${theme.background}, inset 0 50px 100px -5px ${theme.background}`
			: `inset 0 -50px 100px -5px rgba(255, 255, 255, 1), inset 0 50px 100px -5px rgba(255, 255, 255, 1)`;
	}

	elements.circles.forEach(
		(circle) => (circle.style.borderColor = theme.borderColor)
	);
	elements.burgerSpans.forEach(
		(span) => (span.style.backgroundColor = theme.borderColor)
	);
	elements.pinkButtons.forEach(
		(button) => (button.style.backgroundColor = theme.buttonBg)
	);
	elements.carouselIndicators.forEach(
		(indicator) => (indicator.style.backgroundColor = theme.buttonBg)
	);
	elements.carouselControls.forEach((icon) => {
		icon.classList.toggle("dark-theme", isDark);
		icon.classList.toggle("light-theme", !isDark);
	});

	elements.linkDark.forEach((link) => {
		link.classList.toggle("link-dark", !isDark);
		link.classList.toggle("link-light", isDark);
	});
}

function changeTheme() {
	isDarkTheme = !isDarkTheme;
	localStorage.setItem("darkTheme", isDarkTheme);
	applyTheme(isDarkTheme);
}

// Cursor Functions
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

	const handleMouseMove = (event) => {
		const offset = 15;
		const { pageX: x, pageY: y } = event;
		const scrollLeft = window.scrollX ?? document.documentElement.scrollLeft;
		const scrollTop = window.scrollY ?? document.documentElement.scrollTop;

		cursorCircle.style.left = `${x - scrollLeft - offset}px`;
		cursorCircle.style.top = `${y - scrollTop - offset}px`;
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener(
		"mouseleave",
		() => (cursorCircle.style.display = "none")
	);
	document.addEventListener(
		"mouseenter",
		() => (cursorCircle.style.display = "block")
	);
}

function addCursorEffect(element) {
	const handleMouseOver = () => {
		element.style.cursor = "pointer";
		cursorCircle.style.transform = "scale(2)";
		cursorCircle.style.backgroundColor = isDarkTheme
			? "rgba(255, 255, 255, 0.7)"
			: "rgba(0, 0, 0, 0.7)";
	};

	const handleMouseLeave = () => {
		cursorCircle.style.transform = "scale(1)";
		cursorCircle.style.backgroundColor = isDarkTheme
			? "rgba(255, 255, 255, 0.5)"
			: "rgba(0, 0, 0, 0.5)";
	};

	element.addEventListener("mouseover", handleMouseOver);
	element.addEventListener("mouseleave", handleMouseLeave);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
	setupCursorCircle();
	elements.checkbox.checked = isDarkTheme;
	elements.checkboxMobile.checked = isDarkTheme;
	applyTheme(isDarkTheme);

	document
		.querySelectorAll(
			"a, button, input, img, .button-group .button, .button-info, input, .slider"
		)
		.forEach(addCursorEffect);
});

elements.themeSwitch.addEventListener("keypress", (event) => {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		elements.checkbox.click();
	}
});

elements.themeSwitch.addEventListener("click", () => elements.checkbox.click());
elements.checkbox.addEventListener("change", changeTheme);
elements.checkboxMobile.addEventListener("change", changeTheme);

document.querySelector(".navbar-toggler").addEventListener("click", () => {
	elements.animatedIcon.classList.toggle("open");
	elements.navSidebar.classList.toggle("open");
});
