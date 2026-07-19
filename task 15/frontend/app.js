const API_BASE_URL = "http://127.0.0.1:8000";
let activeTab = "analysis";

// File upload listeners
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#5eead4";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
    if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

async function handleFileUpload(file) {
    // Show uploading status
    const statusDisplay = document.getElementById("file-status-display");
    const nameDisplay = document.getElementById("uploaded-file-name");
    const sizeDisplay = document.getElementById("uploaded-file-size");
    
    nameDisplay.textContent = file.name;
    sizeDisplay.textContent = (file.size / 1024).toFixed(1) + " KB";
    statusDisplay.style.display = "flex";
    
    // Clear reports placeholder
    document.getElementById("report-summary").innerHTML = "<p class='placeholder-text'>Processing summarization workflow...</p>";
    document.getElementById("report-takeaways").innerHTML = "<p class='placeholder-text'>Running keyword takeaway extraction...</p>";
    document.getElementById("report-recommendations").innerHTML = "<p class='placeholder-text'>Generating recommendations...</p>";
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: "POST",
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update Metadata
        document.getElementById("meta-doc-id").textContent = data.doc_id;
        document.getElementById("meta-chars").textContent = data.character_count;
        
        // Update report layout
        document.getElementById("report-summary").innerHTML = `<p>${formatText(data.analysis.summary)}</p>`;
        document.getElementById("report-takeaways").innerHTML = `<p>${formatText(data.analysis.takeaways)}</p>`;
        document.getElementById("report-recommendations").innerHTML = `<p>${formatText(data.analysis.recommendations)}</p>`;
        
    } catch (error) {
        document.getElementById("report-summary").innerHTML = `<p style="color: #bf616a;">Failed to upload or analyze: ${error.message}</p>`;
    }
}

function switchTab(tabName) {
    activeTab = tabName;
    
    // Switch buttons active state
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Activate clicked button
    const activeBtn = Array.from(buttons).find(btn => btn.outerHTML.includes(tabName));
    if (activeBtn) activeBtn.classList.add("active");
    
    // Switch contents active state
    document.getElementById("tab-analysis").classList.remove("active");
    document.getElementById("tab-chat").classList.remove("active");
    
    if (tabName === "analysis") {
        document.getElementById("tab-analysis").classList.add("active");
    } else {
        document.getElementById("tab-chat").classList.add("active");
        scrollToBottom();
    }
}

async function sendMessage(event) {
    event.preventDefault();
    const inputElement = document.getElementById("user-input");
    const msg = inputElement.value.trim ? inputElement.value.trim() : inputElement.value;
    if (!msg) return;
    
    inputElement.value = "";
    const box = document.getElementById("messages-box");
    
    // User bubble
    const userBubble = document.createElement("div");
    userBubble.className = "message user-msg";
    userBubble.innerHTML = `<p>${escapeHtml(msg)}</p>`;
    box.appendChild(userBubble);
    scrollToBottom();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        // Bot bubble
        const botBubble = document.createElement("div");
        botBubble.className = "message bot-msg";
        botBubble.innerHTML = `<p>${formatText(data.response)}</p>`;
        box.appendChild(botBubble);
        
    } catch (error) {
        const errBubble = document.createElement("div");
        errBubble.className = "message system-msg";
        errBubble.innerHTML = `<p>Error: ${escapeHtml(error.message)}</p>`;
        box.appendChild(errBubble);
    }
    
    scrollToBottom();
}

function scrollToBottom() {
    const box = document.getElementById("messages-box");
    box.scrollTop = box.scrollHeight;
}

function formatText(text) {
    // Basic Markdown formats to HTML
    return escapeHtml(text)
        .replace(/\n/g, "<br>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\* ([^*<]+)/g, "• $1");
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
