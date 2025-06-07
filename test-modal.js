//selectors for all modals
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//selectors for add trip modal
const addTripButton = document.querySelector(".sidebar__add-button");
const addTripModal = document.querySelector("#add-trip-modal");

//selectors for signup modal
const signupModal = document.querySelector("#signup-modal");
const signupButton = document.querySelector(".header__signup-button");

//selectors for signin modal
const signinModal = document.querySelector("#signin-modal");
const signinButton = document.querySelector(".header__signin-button");

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeModal);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeModal);
};

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
