// Generate a unique session ID initially
let sessionId = "session_" + Math.random().toString(36).substring(2, 9);
document.getElementById("session-display").textContent = sessionId;

// API URL (FastAPI backend local endpoint)
const API_BASE_URL = "http://127.0.0.1:8000";

function startNewSession() {
    sessionId = "session_" + Math.random().toString(36).substring(2, 9);
    document.getElementById("session-display").textContent = sessionId;
    
    const messagesBox = document.getElementById("messages-box");
    messagesBox.innerHTML = `
        <div class="message system-msg">
            <p>New session initialized: <strong>${sessionId}</strong>. Dialogue state is reset.</p>
        </div>
    `;
}

async function sendMessage(event) {
    event.preventDefault();
    
    const inputElement = document.getElementById("user-input");
    const userMessage = inputElement.value.strip ? inputElement.value.strip() : inputElement.value.trim();
    if (!userMessage) return;
    
    // Clear input
    inputElement.value = "";
    
    const messagesBox = document.getElementById("messages-box");
    
    // Append user message to UI
    const userBubble = document.createElement("div");
    userBubble.className = "message user-msg";
    userBubble.innerHTML = `<p>${escapeHtml(userMessage)}</p>`;
    messagesBox.appendChild(userBubble);
    
    // Append Typing Indicator
    const typingBubble = document.createElement("div");
    typingBubble.className = "typing-bubble";
    typingBubble.id = "typing-indicator";
    typingBubble.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    messagesBox.appendChild(typingBubble);
    scrollToBottom();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage,
                session_id: sessionId
            })
        });
        
        // Remove typing indicator
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();
        
        if (!response.ok) {
            throw new Error(`API returned HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        // Append bot message to UI
        const botBubble = document.createElement("div");
        botBubble.className = "message bot-msg";
        // Support basic newline formatting for text responses
        const formattedResponse = escapeHtml(data.response).replace(/\n/g, "<br>");
        botBubble.innerHTML = `<p>${formattedResponse}</p>`;
        messagesBox.appendChild(botBubble);
        
    } catch (error) {
        // Remove typing indicator
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();
        
        // Append error bubble to UI
        const errorBubble = document.createElement("div");
        errorBubble.className = "message system-msg";
        errorBubble.style.borderColor = "#bf616a";
        errorBubble.style.color = "#bf616a";
        errorBubble.innerHTML = `<p>Error: ${escapeHtml(error.message)}</p>`;
        messagesBox.appendChild(errorBubble);
    }
    
    scrollToBottom();
}

function scrollToBottom() {
    const messagesBox = document.getElementById("messages-box");
    messagesBox.scrollTop = messagesBox.scrollHeight;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
