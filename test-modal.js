//selectors for all modals
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//selectors for add trip modal
const addTripButton = document.querySelector(".sidebar__add-button");
const addTripModal = document.querySelector("#add-trip-modal");
const tripNameInput = document.querySelector("#trip-name");
const tripLocationInput = document.querySelector("#trip-location");
const addTripForm = document.forms["add-trip-form"];

//selectors for signup modal
const signupModal = document.querySelector("#signup-modal");
const signupButton = document.querySelector(".header__signup-button");

//selectors for signin modal
const signinModal = document.querySelector("#signin-modal");
const signinButton = document.querySelector(".header__signin-button");

//selectors for trips section
const tripsGrid = document.querySelector(".trips__grid");
const tripTemplate = document.querySelector("#trip__card_template");

//selectors for signing up and signing in and logging out
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");
const signupEmailInput = document.querySelector("#signup-email");
const signupPasswordInput = document.querySelector("#signup-password");
const signinEmailInput = document.querySelector("#signin-email");
const singinPasswordInput = document.querySelector("#signin-password");
const logoutButton = document.querySelector(".sidebar__logout-button");

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeModal);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeModal);
};

const signOut = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/landing-page.html";
};

if (logoutButton) {
  logoutButton.addEventListener("click", signOut);
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("User email already exists");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", email);

    window.location.href = "/index.html";
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signinEmailInput.value;
    const password = singinPasswordInput.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", email);
      window.location.href = "/index.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

if (addTripButton) {
  addTripButton.addEventListener("click", () => {
    openModal(addTripModal);
  });
}

if (signupButton) {
  signupButton.addEventListener("click", () => {
    openModal(signupModal);
  });
}

if (signinButton) {
  signinButton.addEventListener("click", () => {
    openModal(signinModal);
  });
}

//submit function for adding a new trip to trips list
const handleAddTripSubmit = (e) => {
  e.preventDefault();

  const trip = tripTemplate.content
    .querySelector(".trip__card")
    .cloneNode(true);
  const tripName = tripNameInput.value;
  const tripLocation = tripLocationInput.value;

  trip.querySelector(".trip__card_name").textContent = `Name: ${tripName}`;
  trip.querySelector(
    ".trip__card_location"
  ).textContent = `Location ${tripLocation}`;

  tripsGrid.prepend(trip);
  addTripForm.reset();
  closeModal(addTripModal);
};

if (addTripForm) {
  addTripForm.addEventListener("submit", handleAddTripSubmit);
}

//close any modal with x button
modalCloseButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

const escapeModal = (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
};

//close any modal on overlay click
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});
