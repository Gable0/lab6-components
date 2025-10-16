import { getBotResponse } from '../eliza.js';

const RESPONSE_DELAY_MS = 180;
const stylesHref = new URL('./styles3.css', import.meta.url).href;

const TEMPLATE = `
    <style>@import url("${stylesHref}");</style>
    <section class="chat-container">
        <header class="chat-header">
            <h1>Chat Assistant</h1>
            <p>Web Components · Shadow DOM</p>
        </header>
        <section class="messages" role="log" aria-live="polite">
            <p class="message bot">Hello! How can I help you?</p>
        </section>
        <form class="input-area" novalidate>
            <input type="text" placeholder="Type a message..." aria-label="Message" autocomplete="off" />
            <button type="submit" disabled>Send</button>
        </form>
    </section>
`;

class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    connectedCallback() {
        if (this._initialized) return;
        this.shadowRoot.innerHTML = TEMPLATE;

        this.messagesEl = this.shadowRoot.querySelector('.messages');
        this.formEl = this.shadowRoot.querySelector('form');
        this.inputEl = this.shadowRoot.querySelector('input[type="text"]');
        this.submitBtn = this.shadowRoot.querySelector('button[type="submit"]');

        this.formEl.addEventListener('submit', this.handleSubmit);
        this.inputEl.addEventListener('input', this.handleInput);

        this.updateSendState();
        this._initialized = true;
    }

    disconnectedCallback() {
        if (!this._initialized) return;
        this.formEl?.removeEventListener('submit', this.handleSubmit);
        this.inputEl?.removeEventListener('input', this.handleInput);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendCurrentMessage();
    }

    handleInput() {
        this.updateSendState();
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
        const bubble = document.createElement('p');
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

customElements.define('chat-interface', ChatInterface);
