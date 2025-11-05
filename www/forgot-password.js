// pages/forgot-password.js
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { app } from "./firebase.js";

class ForgotPasswordPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
 <ion-app>
        <ion-content class="forgot-password">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="11" size-md="6" size-lg="4">
                        <ion-button href="#/login" class="icon-button" shape="round">
                            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                        </ion-button>
                        <h1>Redefinir senha</h1>
                        <p class="text">Enviaremos instruções para que você possa recuperar sua senha</p>
                        <div class="email-group">
                            <label for="e-mail">E-mail</label>
                            <ion-input class="email-input" id="email" placeholder="Seu e-mail">
                                <ion-icon class="icon-input" slot="start" name="mail-outline"
                                    aria-hidden="true"></ion-icon>
                            </ion-input>
                        </div>
                        <div id="show-error"></div>
                        <ion-button class="primary-button" id="send-reset-password-button" color="dark" expand="full"
                            shape="round">Enviar</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
    <script type="module" src="forgot-password.js"></script>
    `;
  }

  initLogic() {
    const auth = getAuth(app);
    const resetButton = this.querySelector("#send-reset-password-button");
    const content = this.querySelector("ion-content");
    const emailInput = this.querySelector("#email");
    const showError = document.getElementById("show-error");

    resetButton.addEventListener("click", async () => {
      const email = emailInput.value?.trim();
      if (email) {
        try {
          await sendPasswordResetEmail(auth, email);

          content.innerHTML = `
          <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="11" size-md="6" size-lg="4">
                        <ion-button href="#/redefinir-senha" class="icon-button" shape="round">
                            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                        </ion-button>
                        <h1>Sucesso!</h1>
                        <p class="text">Um link para redefinir sua senha foi enviado para: ${email}.</p>
                        <ion-button href="#/login" class="primary-button" color="dark" expand="full" shape="round">Voltar</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
          `;
        } catch (error) {
          showError.innerHTML = showError.innerHTML =
            '<div class="validate-error"><ion-text color="danger"> Erro ao enviar link. Tente novamente mais tarde.</ion-text></div>';
          showError.style.display = "block";
        }
      } else {
        showError.innerHTML = showError.innerHTML =
          '<div class="validate-error"><ion-text color="danger"> Por favor, insira um e-mail válido.</ion-text></div>';
        showError.style.display = "block";
      }
    });
  }
}

customElements.define("forgot-password-page", ForgotPasswordPage);
