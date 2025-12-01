# Smart Home

Este foi um experimento feito para simular o controle de dispositivos inteligentes através do APP para Android. A simulação foi feita através de um Broker MQTT e o Led conectado a uma placa virtual ESP32.

## Principais Funcionalidades

- Autenticação pelo Firebase com Cadastro e Login
- Desligar e ligar dispositivos
- Filtrar por tipo de dispositivo

## Tecnologias Utilizadas

- HTML / CSS / JavaScript / Ionic
- HiveMQ Broker
- ESP32 

## Configuração das Variáveis de Ambiente

Antes de inicializar o projeto, crie um arquivo `firebaseConfig.js` 
```bash
app-smart-home/
├── www/
│ └── firebaseConfig.js
```

## Instalando dependências

1. Abra o terminal dentro da pasta raiz execute o comando:
```bash
npm install
```

## Instalando e buildando o projeto no Android Studio

1. Instale a plataforma Android
```bash
ionic capacitor add android
```

2. Build do projeto
```bash
ionic capacitor add android
```

3. Sincronize com o capacitor
```bash
npx cap sync
```

4. Abra com o Android Studio
```bash
npx cap open android
```

5. Inicie os testes :D

## Rodando o projeto no navegador

1. Clone este repositório
```bash
git clone https://github.com/usuario/nome-do-projeto.git
```

2. Abra a pasta no VSCode

3. Instale a extensão Live Server (caso ainda não tenha) 

4. Clique com botão direito no arquivo `index.html`

5. Abra o projeto no no WokWi pelo [link](https://wokwi.com/projects/447111039173255169)



