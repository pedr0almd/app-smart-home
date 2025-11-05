class WelcomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <ion-app>
        <ion-content class="home">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="10" size-md="6" size-lg="4">

                        <h1>Comece a programar!</h1>
                        <img src="Innovation-amico.svg" alt="Ilustração de inovação"
                            style="width: 100%; height: auto; margin-bottom: 20px;">
                        <p class="text">Mergulhe na programação com templates de telas e funcionalidades.</p>
                        <div class="home-buttons">
                            <ion-button href="#/login" class="primary-button" id="signIn-button" color="dark" expand="full" shape="round">Iniciar
                            </ion-button>
                            <ion-button href="#/criar-conta" class="secondary-button" id="signUp-button" color="dark" expand="full" fill="outline" shape="round">Criar
                                uma
                                conta</ion-button>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
    <script type="module" src="login.js"></script>
    `;
  }
}
customElements.define("welcome-page", WelcomePage);
