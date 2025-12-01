import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class LoginPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
<ion-app>
        <ion-content class="login">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="11" size-md="6" size-lg="4">
                        <ion-button href="#/" class="icon-button" shape="round">
                            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                        </ion-button>
                        <h1>Bem-vindo de volta!</h1>
                        <div class="email-group">
                            <label for="e-mail">E-mail</label>
                            <ion-input class="email-input" id="email" placeholder="Seu e-mail">
                                <ion-icon class="icon-input" slot="start" name="mail-outline"
                                    aria-hidden="true"></ion-icon>
                            </ion-input>
                        </div>
                        <div class="password-group">
                            <label for="password">Senha</label>
                            <ion-input class="password-input" type="password" id="password" label-placement="stacked"
                                placeholder="*******">
                                <ion-icon class="icon-input" slot="start" name="lock-closed-outline"
                                    aria-hidden="true"></ion-icon>
                                <ion-input-password-toggle color="dark" slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </div>
                        <div class="showError"></div>
                        <ion-button href="#/redefinir-senha" class="forgot-password-button" fill="clear" id="forgot-password">Esqueci minha
                            senha</ion-button>
                        <ion-button class="primary-button" id="login-button" color="dark" expand="full"
                            shape="round">Entrar</ion-button>
                        <div class="signInWith">
                            <p>ou entre com</p>
                            <div class="signInWith-buttons">
                            <ion-button class="icon-button" shape="round">
                                    <ion-icon slot="icon-only" name="logo-facebook"></ion-icon>
                                </ion-button>
                                <ion-button class="icon-button" shape="round">
                                    <ion-icon slot="icon-only" name="logo-google"></ion-icon>
                                </ion-button>
                                <ion-button class="icon-button" shape="round">
                                    <ion-icon slot="icon-only" name="logo-apple"></ion-icon>
                                </ion-button>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
    `;
  }

  initLogic() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-button");
    const showError = document.querySelector(".showError");
    const router = document.querySelector("ion-router");

    loginButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        showError.innerHTML =
          '<div class="firebase-auth-error"><ion-text color="danger"> Por favor, preencha todos os campos </ion-text></div>';
        showError.style.display = "block";
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return userCredential.user.getIdToken().then((token) => {
            console.log("Token Firebase:", token);
            localStorage.setItem("firebaseToken", token);
            return router.push("/home");
          });
        })
        .catch((error) => {
          showError.innerHTML =
            '<div class="firebase-auth-error"><ion-text color="danger"> E-mail ou senha inválidos </ion-text></div>';
          showError.style.display = "block";
          console.log(error);
        });
    });
  }
}

customElements.define("login-page", LoginPage);
