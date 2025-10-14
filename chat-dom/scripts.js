import { getBotResponse } from '../eliza.js';

const DEBUG = false; // change to true to see console logs
function log(msg){ if (DEBUG) console.log(msg); }

function getResponse(message) {
    return getBotResponse(message);
}

// append a message node to the chat window with either 'user' or 'bot' class
function appendMessage(text, who) {
    const chatWindow = document.getElementById('chatWindow');
    const p = document.createElement('p');
    p.className = who; // 'user' or 'bot'
    // use textContent to avoid injecting HTML
    p.textContent = text;
    chatWindow.appendChild(p);
    // keep the latest visible
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function processMessage(message) {
    log('processing message: ' + message);
    const response = getResponse(message || '');
    // output bot response after a short delay to feel conversational
    setTimeout(() => appendMessage(response, 'bot'), 150);
}

function send() {
    log('sending...');
    const messageBox = document.getElementById('messageBox');
    const message = messageBox.value.trim();
    if (!message) return;
    messageBox.value = '';
    messageBox.focus();
    appendMessage(message, 'user');
    processMessage(message);
}

function init() {
    log('Loading App...');
    document.getElementById('sendBtn').addEventListener('click', send);
    
    document.getElementById('messageBox').addEventListener('keydown', (e) => { // allow Enter to send (Shift+Enter for newline)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
}

window.addEventListener('DOMContentLoaded', init);