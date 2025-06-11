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

//selectors for dashboard section
const dashboardUsername = document.querySelector(".header__user-name");
const tripsGrid = document.querySelector(".trips__grid");
const tripTemplate = document.querySelector("#trip__card_template");

//selectors for signing up and signing in and logging out
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");
const signupEmailInput = document.querySelector("#signup-email");
const signupPasswordInput = document.querySelector("#signup-password");
const signupNameInput = document.querySelector("#signup-name");
const signinEmailInput = document.querySelector("#signin-email");
const signinPasswordInput = document.querySelector("#signin-password");
const logoutButton = document.querySelector(".sidebar__logout-button");

//selectors for adding expenses
const addExpenseButton = document.querySelector("#addExpenseBtn");
const addExpenseModal = document.querySelector("#add-expense-modal");
const expenseNameInput = document.querySelector("#expense-name");
const expenseCostInput = document.querySelector("#expense-cost");
const addExpenseForm = document.forms["add-expense-form"];

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

// logic for users signing up
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = signupNameInput.value;
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("User email already exists");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", username);

    window.location.href = "/index.html";
  });
}

//logic for users signing in
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signinEmailInput.value;
    const password = signinPasswordInput.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", user.username);
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

if (addExpenseButton) {
  addExpenseButton.addEventListener("click", () => {
    openModal(addExpenseModal);
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
