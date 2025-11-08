class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initLogic();
  }
  render() {
    this.innerHTML = `
  <ion-app>
        <ion-content class="home">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-padding-top" style="height: 100vh;">
                    <ion-col size="11.2" size-md="8" size-lg="6">
                      <div class="profile-container">
                        <div class="profile-picture"><p>IA</p> </div>
                        <div class="profile-greeting-group">
                        <p id="greeting"></p>
                        <p id="name"></p>
                        </div>
                      </div>
                      <ion-searchbar class="search-bar" placeholder="Diga o que quer fazer"></ion-searchbar>
                      <h1 class="device-list">Dispositivos</h1>
                      <div class="circle-device-group" id="device-list">
                        <ion-button class="circle-button add-device">
                          <i class="fi fi-rr-plus-small"></i>
                        </ion-button>
                        <ion-button class="circle-button">
                          <i class="fi fi-tc-bulb"></i>
                        </ion-button>
                        <ion-button class="circle-button">
                          <i class="fi fi-tr-air-conditioner"></i>
                        </ion-button>
                      </div>
                      <h1 class="module">Sala de estar</h1>
                      <div class="card-group">
                        <ion-card class="card disabled">
                          <ion-card-header>
                            <div class="circle-icon"><i class="fi fi-tc-bulb"></i></div>
                          </ion-card-header>

                          <ion-card-content class="lamp-card-content">
                            <ion-card-subtitle>Luz principal</ion-card-subtitle>
                            <label class="power-switch">
                              <input type="checkbox" id="toggle">
                              <span class="slider">
                                <i class="fi fi-rr-power icon"></i>
                              </span>
                            </label>
                            <span>Desligado</span>
                          </ion-card-content>
                          </ion-card>

                          <ion-card class="card enable">
                          <ion-card-header>
                            <div class="circle-icon"><i class="fi fi-tr-air-conditioner"></i></div>
                          </ion-card-header>

                          <ion-card-content>
                          <ion-card-subtitle>Ar-condicionado</ion-card-subtitle>
                            <div class="card-content">
                              <span class="current-temperature">0ºC</span>
                              <div class="air-controll-buttons">
                                <ion-button></i><ion-icon name="remove-outline"></ion-icon></ion-button>
                                <ion-button><ion-icon name="add-outline"></ion-icon></ion-button>
                              </div>
                            </div>
                          </ion-card-content>
                        </ion-card>
                      </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
    <script type="module" src="login.js"></script>
    `;
  }

  initLogic() {
    const nameElement = this.querySelector("#name");
    const greetingElement = document.getElementById("greeting");

    greetingElement.textContent = this.greeting();
    nameElement.textContent = "Ingrid Almeida";
  }

  createProfilePicture(nameElement) {}

  greeting() {
    let hour = new Date().getHours();
    if (hour < 12) {
      return "Bom dia!";
    } else if (hour < 18) {
      return "Boa tarde!";
    } else {
      return "Boa noite!";
    }
  }
}
customElements.define("home-page", HomePage);
