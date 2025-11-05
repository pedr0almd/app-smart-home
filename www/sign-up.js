import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class signUpPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
<ion-app>
        <ion-content class="sign-up">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="11" size-md="6" size-lg="4">
                        <ion-button href="#/" class="icon-button" shape="round">
                            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                        </ion-button>
                        <h1>Criar conta</h1>
                         <!--  
                        <div class="full-name-group">
                            <label for="name">Nome</label>
                            <ion-input class="full-name-input" id="full-name" placeholder="Seu nome completo">
                                <ion-icon class="icon-input" slot="start" name="mail-outline"
                                    aria-hidden="true"></ion-icon>
                            </ion-input>
                        </div> -->
                        <div class="email-group">
                            <label for="e-mail">E-mail</label>
                            <ion-input class="email-input" id="email" placeholder="Seu e-mail">
                                <ion-icon class="icon-input" slot="start" name="mail-outline"
                                    aria-hidden="true"></ion-icon>
                            </ion-input>
                        </div>
                        <div class="password-group">
                            <label for="password">Senha</label>
                            <ion-input class="password-input" id="password" label-placement="stacked" type="password"
                                placeholder="Crie uma senha">
                                <ion-icon class="icon-input" slot="start" name="lock-closed-outline"
                                    aria-hidden="true"></ion-icon>
                                <ion-input-password-toggle color="dark" slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </div>
                        <div class="showError"></div>
                       
                        <ion-button class="primary-button" id="sign-up-button" color="dark" expand="full"
                            shape="round">Criar</ion-button>
                        <div class="signInWith">
                            <p>ou crie com</p>
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
    const signUpButton = document.getElementById("sign-up-button");
    const showError = document.querySelector(".showError");
    const router = document.querySelector("ion-router");

    // Funções
    signUpButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        showError.innerHTML =
          '<div class="firebase-auth-error"><ion-text color="danger"> Por favor, preencha todos os campos </ion-text></div>';
        showError.style.display = "block";
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          router.push("/home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            showError.innerHTML =
              '<div class="firebase-auth-error"><ion-text color="danger">E-mail já está em uso</ion-text></div>';
          } else if (error.code === "auth/invalid-email") {
            showError.innerHTML =
              '<div class="firebase-auth-error"><ion-text color="danger">E-mail inválido</ion-text></div>';
          } else if (error.code === "auth/weak-password") {
            showError.innerHTML =
              '<div class="firebase-auth-error"><ion-text color="danger">Sua senha deve conter 6 caracteres ou mais</ion-text></div>';
          } else {
            showError.innerHTML = `<div class="firebase-auth-error"><ion-text color="danger">Não foi possível criar sua conta.</ion-text></div>`;
          }
          showError.style.display = "block";
          console.log(error);
        });
    });
  }
}

customElements.define("sign-up-page", signUpPage);
