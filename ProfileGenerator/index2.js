const profileForm = document.getElementById("profile-form");
const firstNameInput = document.getElementById("first-name");
const favoriteNumberInput = document.getElementById("favorite-number");
const isStudentInput = document.getElementById("is-student");
const profileResult = document.getElementById("profile-result");

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = firstNameInput.value.trim();
  const favoriteNumber = favoriteNumberInput.value;
  const isStudent = isStudentInput.checked;
  const profile = `${firstName}'s favorite number is ${favoriteNumber}, and ${isStudent ? "they are" : "they are not"} a student.`;

  profileResult.textContent = profile;
});