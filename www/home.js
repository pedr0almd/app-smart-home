import { connectionMQTT } from "./mqtt.js";

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
                      <div class="circle-device-group">
                        <ion-button class="circle-button add-device">
                          <i class="fi fi-rr-plus-small"></i>
                        </ion-button>
                        <ion-button class="circle-button lamp" data-device="lamp">
                          <i class="fi fi-tc-bulb"></i>
                        </ion-button>
                        <ion-button class="circle-button" data-device="air-conditioner">
                          <i class="fi fi-tr-air-conditioner"></i>
                        </ion-button>
                      </div>
                      <h1 class="module">Sala de estar</h1>
                      <div class="card-group">
                        <ion-card class="card lamp disabled" data-device="lamp">
                          <ion-card-header>
                            <div class="circle-icon"><i class="fi fi-tc-bulb"></i></div>
                          </ion-card-header>

                          <ion-card-content class="lamp-card-content">
                            <ion-card-subtitle class="deviceType">Luz principal</ion-card-subtitle>
                            <label class="power-switch">
                              <input type="checkbox" id="ledSwitch">
                              <span class="slider">
                                <i class="fi fi-rr-power icon"></i>
                              </span>
                            </label>
                            <span id="power-text">Desligado</span>
                          </ion-card-content>
                          </ion-card>

                          <ion-card class="card disabled" data-device="air-conditioner">
                          <ion-card-header>
                            <div class="circle-icon"><i class="fi fi-tr-air-conditioner"></i></div>
                          </ion-card-header>

                          <ion-card-content>
                          <ion-card-subtitle class="deviceType">Ar-condicionado</ion-card-subtitle>
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
    connectionMQTT.conectar((status) => {
      console.log("Status recebido:", status);

      const lampSwitch = document.getElementById("ledSwitch");
      const lampCard = document.querySelector('.card[data-device="lamp"]');
      const powerText = document.getElementById("power-text");

      if (status === "ON") {
        lampSwitch.checked = true;
        lampCard.classList.add("enable");
        lampCard.classList.remove("disabled");
        powerText.textContent = "Ligado";
      }

      if (status === "OFF") {
        lampSwitch.checked = false;
        lampCard.classList.add("disabled");
        lampCard.classList.remove("enable");
        powerText.textContent = "Desligado";
      }
    });

    const nameElement = this.querySelector("#name");
    const greetingElement = document.getElementById("greeting");
    const lampSwitch = document.getElementById("ledSwitch");
    const cards = document.querySelectorAll(".card");
    const card = document.querySelector(".card");
    const powerText = document.getElementById("power-text");
    const deviceButtonGroup = document.querySelector(".circle-device-group");
    /*     const deviceTypeElement = document.querySelector(".deviceType");
    const filtredDeviceType = filtredDeviceType.query;
    const deviceType = deviceTypeElement.textContent; */

    greetingElement.textContent = this.greeting();
    nameElement.textContent = "Ingrid Almeida";

    lampSwitch.addEventListener("change", () =>
      this.turnDevice(lampSwitch, card, powerText)
    );

    deviceButtonGroup.addEventListener("click", (event) => {
      if (!event.target.closest(".circle-button")) return;

      const button = event.target.closest(".circle-button");
      const deviceType = button.dataset.device;

      // procura o card correspondente fora do grupo
      const card = document.querySelector(`.card[data-device="${deviceType}"]`);

      if (!card) {
        console.log(`Nenhum card encontrado para o tipo: ${deviceType}`);
        return;
      }

      this.filteredDevices(deviceType, button, cards);
    });
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

  turnDevice(lampSwitch, card, powerText) {
    const valor = lampSwitch.checked ? "ON" : "OFF";

    connectionMQTT.enviarComando(valor);

    if (lampSwitch.checked) {
      card.classList.remove("disabled");
      card.classList.add("enable");
      powerText.textContent = "Ligado";
    } else {
      card.classList.remove("enable");
      card.classList.add("disabled");
      powerText.textContent = "Desligado";
    }
  }

  filteredDevices(deviceType, button, cards) {
    button.classList.toggle("active");

    const activeButtons = [
      ...document.querySelectorAll(".circle-button.active"),
    ];

    if (activeButtons.length === 0) {
      cards.forEach((card) => card.classList.remove("hidden"));
      return;
    }

    const activeTypes = activeButtons.map((btn) => btn.dataset.device);

    cards.forEach((card) => {
      const cardDevice = card.dataset.device;
      card.classList.toggle("hidden", !activeTypes.includes(cardDevice));
    });
  }
}
customElements.define("home-page", HomePage);
