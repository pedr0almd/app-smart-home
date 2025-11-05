class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <ion-app>
        <ion-content class="home">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="10" size-md="6" size-lg="4">
                    <ion-button href="#/" class="icon-button" shape="round">
                            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
                        </ion-button>
                        <h1>Deu certo!</h1>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
    <script type="module" src="login.js"></script>
    `;
  }
}
customElements.define("home-page", HomePage);
