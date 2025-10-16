import { getBotResponse } from '../eliza.js';

const RESPONSE_DELAY_MS = 180;

class SimpleChat extends HTMLElement {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    connectedCallback() {
        if (this._connected) return;
        this._connected = true;

        this.messagesEl = this.querySelector('.messages');
        this.formEl = this.querySelector('form');
        this.inputEl = this.formEl?.querySelector('input[type="text"]');
        this.submitBtn = this.formEl?.querySelector('button[type="submit"]') || this.formEl?.querySelector('button');

        if (!this.messagesEl || !this.formEl || !this.inputEl || !this.submitBtn) {
            console.warn('simple-chat: expected markup missing; enhancement skipped.');
            return;
        }

        this.formEl.addEventListener('submit', this.handleSubmit);
        this.inputEl.addEventListener('input', this.handleInput);
        this.inputEl.addEventListener('keydown', this.handleKeyDown);

        this.updateSendState();
    }

    disconnectedCallback() {
        if (!this._connected || !this.formEl) return;
        this.formEl.removeEventListener('submit', this.handleSubmit);
        this.inputEl?.removeEventListener('input', this.handleInput);
        this.inputEl?.removeEventListener('keydown', this.handleKeyDown);
        this._connected = false;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendCurrentMessage();
    }

    handleInput() {
        this.updateSendState();
    }

    handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendCurrentMessage();
        }
    }

    updateSendState() {
        if (!this.submitBtn) return;
        const hasContent = this.inputEl?.value.trim().length > 0;
        this.submitBtn.disabled = !hasContent;
    }

    sendCurrentMessage() {
        const message = this.inputEl?.value.trim();
        if (!message) return;

        this.inputEl.value = '';
        this.updateSendState();
        this.inputEl.focus();

        this.appendMessage(message, 'user');
        this.processMessage(message);
    }

    appendMessage(text, role) {
        if (!this.messagesEl) return;
        const bubble = document.createElement('div');
        bubble.className = `message ${role}`;
        bubble.textContent = text;
        this.messagesEl.appendChild(bubble);
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }

    processMessage(message) {
        const response = getBotResponse(message || '');
        window.setTimeout(() => {
            this.appendMessage(response, 'bot');
        }, RESPONSE_DELAY_MS);
    }
}

customElements.define('simple-chat', SimpleChat);
