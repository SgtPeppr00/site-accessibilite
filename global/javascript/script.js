// DOM Elements
const elements = {
	animatedIcon: document.querySelector(".animated-icon"),
	backdropAccueil: document.querySelector("#backdropaccueil"),
	navSidebar: document.querySelector("#navsidebar"),
	mobileHeader: document.querySelector(".mobile-header"),
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
	customTexts: document.querySelectorAll(
		".text-dark, .text-success, .text-muted"
	),
	bgLight: document.querySelectorAll(".bg-light-custom"),
	galleryControls: document.querySelectorAll(".gallery-controls button"),
	galleryArrows: document.querySelectorAll(
		".gallery-controls-previous::before, .gallery-controls-next::before"
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
		sidebar: "#4B4848",
		header: "#fff",
		textDark: "black",
		textSuccess: "#7BB928",
		textMuted: "#6c757d",
		bgCustomLight: "#f8f9fa", // Bootstrap's default light background
	},
	dark: {
		background: "black",
		text: "white",
		buttonBg: "#D76891",
		cursorBg: "rgba(255, 255, 255, 0.5)",
		borderColor: "white",
		sidebar: "#1E1E1E",
		header: "#1E1E1E",
		textDark: "white",
		textSuccess: "#95d742",
		textMuted: "#a7a7a7",
		bgCustomLight: "#222222", // Darker background for dark theme
	},
};

let isDarkTheme = localStorage.getItem("darkTheme") === "true";

// Theme Functions
function syncCheckboxes(checked) {
	elements.checkbox.checked = checked;
	elements.checkboxMobile.checked = checked;
}

function applyTheme(isDark) {
	const theme = isDark ? themeColors.dark : themeColors.light;

	document.body.style.background = theme.background;
	document.body.style.color = theme.text;
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
	elements.mobileHeader.style.backgroundColor = theme.header;

	elements.navSidebar.style.backgroundColor = theme.sidebar;

	// Handle text colors
	elements.customTexts.forEach((element) => {
		console.log(element);
		if (element.classList.contains("text-dark")) {
			element.style.setProperty("color", theme.textDark, "important");
		} else if (element.classList.contains("text-success")) {
			element.style.setProperty("color", theme.textSuccess, "important");
		} else if (element.classList.contains("text-muted")) {
			element.style.setProperty("color", theme.textMuted, "important");
		}
	});

	// Handle background colors
	elements.bgLight.forEach((element) => {
		element.style.setProperty(
			"background-color",
			theme.bgCustomLight,
			"important"
		);
	});

	// Update gallery controls colors
	elements.galleryControls.forEach((button) => {
		button.style.color = theme.buttonBg;
	});

	// Add/remove dark theme class to body for gallery arrows
	document.body.classList.toggle("dark-theme", isDark);
}

function changeTheme() {
	isDarkTheme = !isDarkTheme;
	localStorage.setItem("darkTheme", isDarkTheme);
	syncCheckboxes(isDarkTheme);
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
	syncCheckboxes(isDarkTheme);
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
