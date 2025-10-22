# lab6-components - Gable Krich

Fall 2025 · COMP 305

## Link to the Live Page using Netlify: https://gable0comp305lab6.netlify.app/


## Thoughtful Comparison of Approaches
- **Prototype (HTML & CSS only):** Shows the look of the chat but does not send messages.
- **Approach 1 (DOM JavaScript):** Adds simple JavaScript so the chat can send and show messages.
- **Approach 2 (Progressive Enhancement):** Uses the DOM version, then adds extra features only when JavaScript is available.
- **Approach 3 (Web Component):** Wraps the enhanced chat in a custom element so it can be reused in other pages.

## Clear Explanation of Trade-offs
- **Prototype:** Fast to build and easy to demo, but not useful for real interaction.
- **DOM JavaScript:** Works in all modern browsers, yet the script can grow messy as new features pile up.
- **Progressive Enhancement:** Keeps the basic version for everyone and adds upgrades for capable browsers, but you must support two layers of behavior.
- **Web Component:** Makes the chat self-contained and reusable, though you need to learn the component APIs and deal with styling inside the Shadow DOM.

## Links and Documentation
- [Prototype – Pure HTML & CSS](chat-prototype-html-css/index0.html) – static layout of the chat screen.
- [Approach 1 – DOM JavaScript](chat-dom/index1.html) – plain JavaScript version that handles basic chat flow.
- [Approach 2 – Progressive Enhancement](chat-webcomponent-pe/index2.html) – starts from the DOM build and adds features when possible.
- [Approach 3 – Web Component](chat-webcomponent-gd/index3.html) – custom element version that hides its markup with Shadow DOM.
