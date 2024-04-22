import { AuthenticationService } from "./authenticationService.mjs";
import { UserRepository } from "./userRepository.mjs";
import { firestore, authentication } from "./firebase.mjs";

const authenticationService = new AuthenticationService({
  firebaseAuth: authentication,
});

const userRepository = new UserRepository({
  database: firestore,
});

async function onSIgnUp(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const role = formData.get("role");

  const response = await authenticationService.RegisterUserWithEmailAndPassword(
    {
      email: email,
      password: password,
    }
  );

  if (response !== "error") {
    //
    const user = {
      id: response,
      name: username,
      email: email,
      password: password,
      role: role,
    };

    const dbResponse = await userRepository.createUser({ user: user });
    alert(dbResponse);
  }
}

async function onSignIn(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const response = await authenticationService.SignInWithEmailAndPassword({
    email: email,
    password: password,
  });

  if (response !== "error") {
    const user = await userRepository.getuserById({
      id: response,
    });

    if (role !== user.role) {
      alert("user not found");
    } else {
      //move to next page according to role
      alert("signed in");
    }
  }
}

const signUpLink = document.getElementById("sign-up");
const loginLink = document.getElementById("login");
const loginForm = document.getElementById("login-form");
const signUpForm = document.getElementById("signup-form");

signUpLink.addEventListener("click", () => {
  loginForm.style.display = "none";
  signUpForm.style.display = "block";
});

loginLink.addEventListener("click", () => {
  loginForm.style.display = "block";
  signUpForm.style.display = "none";
});

signUpForm.addEventListener("submit", (e) => onSIgnUp(e));
loginForm.addEventListener("submit", (e) => onSignIn(e));
