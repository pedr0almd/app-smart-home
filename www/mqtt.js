const MQTT_URL = "wss://mqtt-dashboard.com:8884/mqtt";

const TOPIC_COMANDO = "smart-home/dispositivos/lampada";
const TOPIC_STATUS = "smart-home/dispositivos/lampada/status";

class ConnectionMQTT {
  constructor() {
    this.client = null;
    this.conectado = false;
  }

  conectar(onStatusRecebido = null) {
    this.client = mqtt.connect(MQTT_URL);

    this.client.on("connect", () => {
      this.conectado = true;
      console.log("Conectado ao broker MQTT");

      // inscreve no status
      this.client.subscribe(TOPIC_STATUS);
    });

    this.client.on("message", (topic, message) => {
      const payload = message.toString();
      console.log(`Mensagem recebida no tópico ${topic}: ${payload}`);

      if (topic === TOPIC_STATUS && onStatusRecebido) {
        onStatusRecebido(payload);
      }
    });

    this.client.on("error", (error) => {
      console.error("Erro na conexão MQTT:", error);
    });

    this.client.on("close", () => {
      this.conectado = false;
      console.log("⚠ Conexão MQTT fechada");
    });
  }

  enviarComando(valor) {
    if (!this.conectado) {
      console.error("MQTT não está conectado. Não foi possível enviar.");
      return;
    }

    this.client.publish(TOPIC_COMANDO, valor);
    console.log(`Mensagem enviada (${valor})`);
  }
}

export const connectionMQTT = new ConnectionMQTT();
