const animatedicon = document.querySelector(".animated-icon");
const navsidebar = document.querySelector(".navsidebar");

document
	.querySelector(".navbar-toggler")
	.addEventListener("click", function () {
		animatedicon.classList.toggle("open");
		navsidebar.classList.toggle("open");
	});

const themeButton = document.getElementById("themebutton");
const themeButtonMobile = document.getElementById("themebuttonmobile");
const circles = document.querySelectorAll(".circle");
const burgerspan = document.querySelectorAll(".burgerspan");
const linkdark = document.querySelectorAll(".link-dark");
let isDarkTheme = localStorage.getItem("darkTheme") === "true";

themeButtonMobile.addEventListener("click", changeTheme);
themeButton.addEventListener("click", changeTheme);

function applyTheme(isDark) {
	if (!isDark) {
		document.body.style.backgroundColor = "";
		document.body.style.color = "";
		themeButton.classList.remove("btn-dark");
		themeButton.classList.add("btn-light");
		navsidebar.style.background = "";
		navsidebar.style.borderColor = "black";
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
	} else {
		document.body.style.background = "black";
		document.body.style.color = "white";
		themeButton.classList.remove("btn-light");
		themeButton.classList.add("btn-dark");
		navsidebar.style.background = "black";
		navsidebar.style.borderColor = "white";
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
	}
}

function changeTheme() {
	isDarkTheme = !isDarkTheme;
	localStorage.setItem("darkTheme", isDarkTheme);
	applyTheme(isDarkTheme);
}

// Apply theme on page load
applyTheme(isDarkTheme);
