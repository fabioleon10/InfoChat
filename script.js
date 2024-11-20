
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggle-sidebar");
const reopenSidebar = document.getElementById("reopen-sidebar");
const chatList = document.getElementById("chat-list");
const newChatBtn = document.getElementById("new-chat-btn");
const messagesContainer = document.getElementById("messages");
const welcomeMessage = document.getElementById("welcome-message");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Histórico de conversas
let chats = [];
let currentChatIndex = null;

// Alternar barra lateral
toggleSidebar.addEventListener("click", () => {
    sidebar.classList.add("collapsed");
    reopenSidebar.classList.add("visible");
});

reopenSidebar.addEventListener("click", () => {
    sidebar.classList.remove("collapsed");
    reopenSidebar.classList.remove("visible");
});

// Botão Novo Chat
newChatBtn.addEventListener("click", () => {
    if (currentChatIndex !== null) saveChat(); // Salva o chat atual
    startNewChat();
});

// Enviar mensagem
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); 
        sendMessage();
    }
});


// Função para iniciar um novo chat
function startNewChat() {
    messagesContainer.innerHTML = ""; // Limpa mensagens do chat
    welcomeMessage.style.display = "block"; // Exibe mensagem de boas-vindas
    currentChatIndex = null; // Reset do índice do chat
    userInput.value = ""; // Limpa o campo de entrada
}

// Função para renderizar a lista de conversas na barra lateral
function renderChatList() {
    chatList.innerHTML = ""; // Limpa a lista de chats
    chats.forEach((chat, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="chat-preview">${chat.preview}</span>`;
        li.addEventListener("click", () => openChat(index));
        chatList.appendChild(li);
    });
}

// Função para abrir uma conversa do histórico
function openChat(index) {
    currentChatIndex = index;
    const chat = chats[index];
    welcomeMessage.style.display = "none"; // Oculta mensagem de boas-vindas
    messagesContainer.innerHTML = chat.messages.join(""); // Reexibe mensagens
}

// Função para enviar mensagens do usuário
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Adicionar mensagem do usuário ao chat
    addMessage(message, "user");
    userInput.value = ""; // Limpa o campo de entrada

    // Ocultar mensagem de boas-vindas
    welcomeMessage.style.display = "none";

    // Simular resposta automática do bot
    setTimeout(() => {
        addMessage("Esta é uma resposta automática do InfoChat.", "bot");
    }, 1000);
}

// Função para adicionar uma mensagem ao chat
function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);

    // Rolagem automática para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
