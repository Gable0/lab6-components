import { getBotResponse } from '../eliza.js';

const DEBUG = false; // change to true to see console logs
function log(msg){ if (DEBUG) console.log(msg); }

let messageBoxElement;
let sendBtnElement;

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

function updateSendState() {
    const hasText = messageBoxElement.value.trim().length > 0;
    sendBtnElement.disabled = !hasText;
}

function send() {
    log('sending...');
    const message = messageBoxElement.value.trim();
    if (!message) return;
    messageBoxElement.value = '';
    messageBoxElement.focus();
    updateSendState();
    appendMessage(message, 'user');
    processMessage(message);
}

function init() {
    log('Loading App...');
    messageBoxElement = document.getElementById('messageBox');
    sendBtnElement = document.getElementById('sendBtn');

    sendBtnElement.addEventListener('click', send);
    messageBoxElement.addEventListener('input', updateSendState);
    
    messageBoxElement.addEventListener('keydown', (e) => { // allow Enter to send (Shift+Enter for newline)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });

    updateSendState();
}

window.addEventListener('DOMContentLoaded', init);
