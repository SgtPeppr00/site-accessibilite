const synth = window.speechSynthesis;
let activeFilter = document
	.querySelector(".btn-group .button.button-primary")
	?.getAttribute("data-category");
let isHovering = false;
function initalizeScrollUpButton() {
	const scrollBtn = document.getElementById("scrollTopBtn");

	const toggleScrollBtn = () => {
		if (window.innerWidth < 1000) {
			scrollBtn.classList.remove("d-none");
			scrollBtn.classList.add("d-block");
		} else {
			scrollBtn.classList.remove("d-block");
			scrollBtn.classList.add("d-none");
		}
	};

	scrollBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	window.addEventListener("resize", toggleScrollBtn);
	toggleScrollBtn();
}

function initializeSearchBar() {
	document.getElementById("searchBar").addEventListener("input", function () {
		const searchTerm = this.value.toLowerCase();
		const cards = document.querySelectorAll(".card-item");
		const activeCategory = document
			.querySelector(".btn-group .button.button-primary")
			?.getAttribute("data-category");
		let i = 0;
		let visibleCards = 0;

		cards.forEach((card) => {
			const title = card.dataset.title.toLowerCase();
			const id = card.dataset.image.slice(0, -4).toLowerCase();
			const matchesSearch =
				title.includes(searchTerm) || id.includes(searchTerm);
			const matchesCategory =
				!activeCategory ||
				card.getAttribute("data-category") === activeCategory;

			if (matchesSearch && matchesCategory) {
				card.style.display = "block";
				card.querySelector("img").tabIndex = 0;
				card.setAttribute("data-id", i);
				i += 1;
				visibleCards++;
			} else {
				card.style.display = "none";
				card.querySelector("img").tabIndex = -1;
				card.setAttribute("data-id", "");
			}
		});

		// Handle no results message
		const existingMessage = document.querySelector(".no-results");
		if (visibleCards === 0) {
			if (!existingMessage) {
				const noResults = document.createElement("div");
				noResults.className = "no-results";
				noResults.textContent = "Aucune carte ne correspond à ces critères";
				document.getElementById("cardGrid").appendChild(noResults);
			}
		} else if (existingMessage) {
			existingMessage.remove();
		}
	});
}

function filterCards(category) {
	const searchTerm = document.getElementById("searchBar").value.toLowerCase();
	const cards = document.querySelectorAll(".card-item");
	const buttons = document.querySelectorAll(".btn-group .button");
	const activeButton = document.querySelector(
		`.btn-group .button.button-primary[data-category="${category}"]`
	);
	const button = document.querySelector(
		`.btn-group .button[data-category="${category}"]`
	);
	activeFilter = category;
	console.log(activeFilter);
	console.log(button);
	if (activeButton) {
		// If the clicked button is already active, remove the filter
		cards.forEach((card) => {
			const title = card.dataset.title.toLowerCase();
			card.style.display = title.includes(searchTerm) ? "block" : "none";
		});

		// Reset all buttons
		buttons.forEach((button) => {
			button.classList.remove("button-primary");
			// Restore original colors based on background class
			if (button.classList.contains("bluebg")) {
				button.style.color = "#207cc4";
			} else if (button.classList.contains("redbg")) {
				button.style.color = "#c0245c";
			} else if (button.classList.contains("greenbg")) {
				button.style.color = "#78c444";
			} else if (button.classList.contains("orangebg")) {
				button.style.color = "#f09424";
			} else if (button.classList.contains("purplebg")) {
				button.style.color = "#68449c";
			}
		});
		activeFilter = null;
		document.getElementById("familytitle").innerText = "Toutes les cartes";
	} else {
		// Apply the filter
		cards.forEach((card) => {
			const title = card.dataset.title.toLowerCase();
			const matchesSearch = title.includes(searchTerm);
			const matchesCategory = card.getAttribute("data-category") === category;
			card.style.display = matchesSearch && matchesCategory ? "block" : "none";
		});

		// Update button styles
		buttons.forEach((button) => {
			if (button.getAttribute("data-category") === category) {
				button.classList.add("button-primary");
				button.style.color = "white";
			} else {
				button.classList.remove("button-primary");
				// Restore original colors for inactive buttons
				if (button.classList.contains("bluebg")) {
					button.style.color = "#207cc4";
				} else if (button.classList.contains("redbg")) {
					button.style.color = "#c0245c";
				} else if (button.classList.contains("greenbg")) {
					button.style.color = "#78c444";
				} else if (button.classList.contains("orangebg")) {
					button.style.color = "#f09424";
				} else if (button.classList.contains("purplebg")) {
					button.style.color = "#68449c";
				}
			}
		});
		document.getElementById("familytitle").innerText =
			button.getAttribute("familyname");
	}

	let i = 0;
	let visibleCards = 0;
	cards.forEach((card) => {
		if (card.style.display === "block") {
			card.querySelector("img").tabIndex = 0;
			card.setAttribute("data-id", i);
			i += 1;
			visibleCards++;
		} else {
			card.querySelector("img").tabIndex = -1;
			card.setAttribute("data-id", "");
		}
	});

	// Handle no results message
	const existingMessage = document.querySelector(".no-results");
	if (visibleCards === 0) {
		if (!existingMessage) {
			const noResults = document.createElement("div");
			noResults.className = "no-results";
			noResults.textContent = "Aucune carte ne correspond à ces critères";
			document.getElementById("cardGrid").appendChild(noResults);
		}
	} else if (existingMessage) {
		existingMessage.remove();
	}
}

function setupSkipButton() {
	const skipButton = document.getElementById("skipToCards");
	["click", "keydown"].forEach(function (e) {
		skipButton.addEventListener(e, () => {
			if (e === "keydown" && event.key !== "Enter") {
				return;
			}
			const firstVisibleCard = Array.from(
				document.querySelectorAll(".card-item")
			)
				.find((card) => window.getComputedStyle(card).display !== "none")
				?.querySelector("img");
			if (firstVisibleCard) {
				firstVisibleCard.focus();
				firstVisibleCard.scrollIntoView();
			}
			skipButton.blur();
		});
	});
}
function displayFamilyName(familyName) {
	isHovering = true;
	const nameDiv = document.querySelector("#nameOfFamily");
	const alertDiv = nameDiv.parentElement;

	nameDiv.textContent = familyName;
	alertDiv.classList.remove("d-none");
	setTimeout(() => {
		alertDiv.classList.add("show");
	}, 10);

	// Set colors based on family name
	if (familyName.toLowerCase().includes("journée")) {
		alertDiv.style.backgroundColor = "#207cc4";
		nameDiv.style.color = "white";
	} else if (familyName.toLowerCase().includes("accessibilité")) {
		alertDiv.style.backgroundColor = "#c0245c";
		nameDiv.style.color = "white";
	} else if (familyName.toLowerCase().includes("matériel")) {
		alertDiv.style.backgroundColor = "#f09424";
		nameDiv.style.color = "white";
	} else if (familyName.toLowerCase().includes("numérique")) {
		alertDiv.style.backgroundColor = "#78c444";
		nameDiv.style.color = "white";
	} else if (familyName.toLowerCase().includes("événements")) {
		alertDiv.style.backgroundColor = "#68449c";
		nameDiv.style.color = "white";
	}
}

function updateDisplayedText() {
	const activeFamilyName = getActiveFamilyName();
	if (activeFamilyName) {
		displayFamilyName(activeFamilyName);
	} else {
		hideFamilyName();
	}
}

function getActiveFamilyName() {
	if (activeFilter) {
		const button = document.querySelector(
			`.filter-button[data-category="${activeFilter}"]`
		);
		return button ? button.getAttribute("familyName") : null;
	}
	return null;
}

let hideTimeout;

function hideFamilyName() {
	isHovering = false;
	clearTimeout(hideTimeout);
	hideTimeout = setTimeout(() => {
		if (!activeFilter && !isHovering) {
			const nameDiv = document.querySelector("#nameOfFamily");
			const alertDiv = nameDiv.parentElement;
			alertDiv.classList.remove("show");
			setTimeout(() => {
				alertDiv.classList.add("d-none");
			}, 300);
		}
	}, 500);
}

function handleButtonHover() {
	isHovering = true;
	clearTimeout(hideTimeout);
}
function removeFocus() {
	document.activeElement.blur();
}

function fetchAndDisplayCards() {
	fetch("../data/cartes.json")
		.then((response) => response.json())
		.then((data) => {
			const buttonGroup = document.querySelector(".btn-group");

			// Define the desired order of categories
			const categoryOrder = [
				"accessibilite-des-lieux", // rose (rouge)
				"evenements-sociaux-professionnels", // violet
				"materiel", // jaune (orange)
				"numerique", // vert
				"organisation-de-la-journee", // bleu
			];

			// Create buttons in the specified order
			categoryOrder.forEach((categoryId) => {
				const famille = data.familles.find((f) => f.id === categoryId);
				if (!famille) return;

				const button = document.createElement("button");
				button.className =
					"button button-secondary mx-1 rounded-pill filter-button";
				button.setAttribute("data-category", famille.id);
				button.addEventListener("click", () => filterCards(famille.id));
				button.classList.add("filter-button");
				button.setAttribute("familyName", famille.titre);
				button.setAttribute("title", `Filtrer par ${famille.titre}`);

				if (famille.id == "organisation-de-la-journee") {
					button.classList.add("bluebg");
					button.dataset.originalBg = "bluebg";
					button.textContent = "BLEU";
				}
				if (famille.id == "accessibilite-des-lieux") {
					button.classList.add("redbg");
					button.dataset.originalBg = "redbg";
					button.textContent = "ROSE";
				}
				if (famille.id == "materiel") {
					button.classList.add("orangebg");
					button.dataset.originalBg = "orangebg";
					button.textContent = "JAUNE";
				}
				if (famille.id == "numerique") {
					button.classList.add("greenbg");
					button.dataset.originalBg = "greenbg";
					button.textContent = "VERT";
				}
				if (famille.id == "evenements-sociaux-professionnels") {
					button.classList.add("purplebg");
					button.dataset.originalBg = "purplebg";
					button.textContent = "VIOLET";
				}
				button.addEventListener("mouseover", () =>
					displayFamilyName(famille.titre)
				);
				button.addEventListener("mouseout", updateDisplayedText);
				button.addEventListener("focus", () =>
					displayFamilyName(famille.titre)
				);
				button.addEventListener("mouseleave", () => removeFocus());
				buttonGroup.appendChild(button);
			});

			const cardGrid = document.getElementById("cardGrid");
			cardGrid.innerHTML = "";
			let i = 0;
			let previousfamily = "";
			let idNum = 0;
			data.familles.forEach((famille) => {
				famille.cartes.forEach((carte) => {
					if (previousfamily != famille.id) {
						idNum = 0;
					}
					idNum += 1;
					let addon = "";
					if (famille.id == "organisation-de-la-journee") {
						addon = "BL";
					}
					if (famille.id == "accessibilite-des-lieux") {
						addon = "RO";
					}
					if (famille.id == "materiel") {
						addon = "OR";
					}
					if (famille.id == "numerique") {
						addon = "VE";
					}
					if (famille.id == "evenements-sociaux-professionnels") {
						addon = "VI";
					}
					const card = document.createElement("div");
					card.className = "col card-item";
					card.setAttribute("data-category", famille.id);
					card.setAttribute("data-title", carte.titre);
					card.setAttribute("data-subtitle", carte.sousTitre);
					card.setAttribute("data-description", carte.description);
					card.setAttribute("data-image", `${carte.id}-${addon}0${idNum}.png`);
					card.setAttribute("data-id", i);

					card.style.display = "block";
					i += 1;
					previousfamily = famille.id;

					// Afficher uniquement l'image dans la carte
					card.innerHTML = `
						<div class="card h-100" role="listitem" aria-labelledby="card-title-${carte.id}" aria-describedby="card-description-${carte.id}">
							<img src="../img/cartes_new/${carte.id}-${addon}0${idNum}.png" class="card-img-top h-100" alt="${carte.titre}" tabindex="0" aria-labelledby="card-title-${carte.id}" />

						</div>
					`;

					cardGrid.appendChild(card);
				});
			});

			// Ajouter des écouteurs d'événements aux images après l'ajout de toutes les cartes
			document.querySelectorAll(".card-item img").forEach((img) => {
				["click", "keydown"].forEach(function (e) {
					img.addEventListener(e, () => {
						if (e === "keydown" && event.key !== "Enter") {
							return;
						}
						const card = img.closest(".card-item");
						const title = card.dataset.title;
						const subTitle = card.dataset.subtitle;
						const description = card.dataset.description;
						const id = card.dataset.id;

						// Création du modal avec uniquement l'image et le contenu de la carte
						const modal = document.createElement("div");
						modal.className = "modal fade";
						modal.tabIndex = -1;
						modal.innerHTML = `
												<div class="modal-dialog modal-dialog-centered modal-xl px-5" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
													<div class="modal-content position-relative px-5">
														<button type="button" class="btn btn-secondary position-absolute start-0 top-50 translate-middle-y" 
																style="z-index: 1000; margin-left: 25px;" 
																id="prevCard" data-id="${id}" 
																aria-label="Previous card">&#11164;</button>

														<button type="button" class="btn btn-secondary position-absolute end-0 top-50 translate-middle-y" 
																style="z-index: 1000; margin-right: 25px;" 
																id="nextCard" data-id="${id}" 
																aria-label="Next card">&#11166;</button>

														<div class="modal-header">
															<h5 class="modal-title" id="modalTitle">${title}</h5>
															<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
														</div>
														<div class="modal-body" id="modalDescription">
															<div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
																<div class="position-relative w-100 w-lg-75 mb-3 mb-lg-0" style="max-width: 80%;">
																	<img src="../img/cartes_new/${card.dataset.image}" class="img-fluid mx-auto d-block" style="max-width: 95%;" alt="${title}" />
																</div>

																<div class="w-100 w-lg-50 text-center text-lg-start px-3">
																	<h6 class="subTitle">"${subTitle}"</h6>
																	<p class="description">${description}</p>
																	<button type="button" class="btn btn-info button-info mb-3" aria-label="Écouter la carte">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
																			<path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
																			<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
																		</svg>
																	</button>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
														</div>
													</div>
												</div>
												`;

						document.body.appendChild(modal);
						const bootstrapModal = new bootstrap.Modal(modal);
						bootstrapModal.show();

						// Lecture de la carte
						modal
							.querySelector(".button-info")
							.addEventListener("click", () => {
								const utterance = new SpeechSynthesisUtterance(
									`${title}. ${subTitle}. ${description}`
								);
								utterance.lang = "fr-FR";
								synth.speak(utterance);
							});
						modal.querySelectorAll("button").forEach((button) => {
							addCursorEffect(button);
						});
						modal.querySelectorAll("#nextCard, #prevCard").forEach((button) => {
							button.addEventListener("click", () => {
								handleCardNavigation(
									button.id === "nextCard" ? "next" : "prev",
									parseInt(button.dataset.id)
								);
							});
						});
						document.addEventListener("keydown", (event) => {
							if (event.key === "Escape") {
								bootstrapModal.hide();
							}
						});
						document.addEventListener("keydown", (event) => {
							if (event.key === "p") {
								synth.cancel();
							}
						});

						// Suppression du modal après sa fermeture
						modal.addEventListener("hidden.bs.modal", () => {
							modal.remove();
						});
					});
				});
			});
			document
				.querySelectorAll(
					"a, button, input, img, .btn-group .button, .button-info, input, .slider"
				)
				.forEach((element) => {
					addCursorEffect(element);
				});
		})
		.catch((error) => console.error("Error fetching data:", error));
}

function handleCardNavigation(direction, id) {
	const allcards = document.querySelectorAll(".card-item");
	const cards = Array.from(allcards).filter(
		(card) => card.style.display === "block"
	);
	const modal = document.querySelector(".modal");
	const nextCard = direction === "next" ? id + 1 : id - 1;
	const card = cards[nextCard];
	if (card) {
		const title = card.dataset.title;
		const subTitle = card.dataset.subtitle;
		const description = card.dataset.description;
		const image = card.dataset.image;
		const id = card.dataset.id;

		modal.querySelector(".modal-title").textContent = title;
		modal.querySelector("img").src = `../img/cartes_new/${image}`;
		modal.querySelector("img").alt = title;
		modal.querySelector("h6").textContent = `"${subTitle}"`;

		modal.querySelector("p").textContent = description;
		modal.querySelector("#nextCard").dataset.id = id;
		modal.querySelector("#prevCard").dataset.id = id;
	} else {
		if (direction === "next") {
			const title = cards[0].dataset.title;
			const subTitle = cards[0].dataset.subtitle;
			const description = cards[0].dataset.description;
			const image = cards[0].dataset.image;
			const id = cards[0].dataset.id;

			modal.querySelector(".modal-title").textContent = title;
			modal.querySelector("img").src = `../img/cartes_new/${image}`;
			modal.querySelector("img").alt = title;
			modal.querySelector("h6").textContent = `"${subTitle}"`;

			modal.querySelector("p").textContent = description;
			modal.querySelector("#nextCard").dataset.id = id;
			modal.querySelector("#prevCard").dataset.id = id;
		} else {
			const title = cards[cards.length - 1].dataset.title;
			const subTitle = cards[cards.length - 1].dataset.subtitle;
			const description = cards[cards.length - 1].dataset.description;
			const image = cards[cards.length - 1].dataset.image;
			const id = cards[cards.length - 1].dataset.id;

			modal.querySelector(".modal-title").textContent = title;
			modal.querySelector("img").src = `../img/cartes_new/${image}`;
			modal.querySelector("img").alt = title;
			modal.querySelector("h6").textContent = `"${subTitle}"`;

			modal.querySelector("p").textContent = description;
			modal.querySelector("#nextCard").dataset.id = id;
			modal.querySelector("#prevCard").dataset.id = id;
		}
	}
}

function handleKeyEvents() {
	document.addEventListener("keydown", (event) => {
		const modal = document.querySelector(".modal");
		if (modal) {
			if (event.key === "ArrowLeft") {
				const id = parseInt(modal.querySelector("#prevCard").dataset.id);
				handleCardNavigation("prev", id);
			}
			if (event.key === "ArrowRight") {
				const id = parseInt(modal.querySelector("#nextCard").dataset.id);
				handleCardNavigation("next", id);
			}
		}
	});
}

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
	initalizeScrollUpButton();
	initializeSearchBar();
	setupSkipButton();
	fetchAndDisplayCards();
	handleKeyEvents();
});
