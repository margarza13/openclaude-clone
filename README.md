# OpenClaude Clone

A Claude-inspired chat UI built with React and Tailwind CSS. Clean, dark-themed interface with multi-conversation support, streaming responses, markdown rendering, syntax highlighting, and model selection — powered by the Anthropic Claude API.

## ✨ Features

- 💬 Multi-conversation sidebar (like Claude)
- 🌙 Dark theme UI with smooth message bubbles
- ⚡ Streaming responses — text appears word by word
- 📝 Markdown rendering — bold, italics, lists, headings, blockquotes
- 🎨 Syntax highlighting for code blocks (190+ languages via highlight.js)
- 📋 Copy button on every code block
- 🤖 Model selector — switch between Claude 3 Haiku, Sonnet, and Opus
- 💾 Export any conversation as a Markdown file
- 🔑 API key prompt on first load (stored in browser localStorage only)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/margarza13/openclaude-clone.git
cd openclaude-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Copy the example env file:

```bash
cp .env.example .env
```

Add your Anthropic API key to `.env`:

```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
```

> Or just enter it in the UI when prompted on first launch.

### 4. Start the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂 Project Structure

```
openclaude-clone/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── claude.js            # Anthropic API adapter (streaming + non-streaming)
│   ├── components/
│   │   ├── Sidebar.jsx          # Conversation list sidebar
│   │   ├── MessageBubble.jsx    # Chat message with markdown + syntax highlighting
│   │   ├── ChatInput.jsx        # Input bar with send button
│   │   ├── ApiKeyModal.jsx      # API key entry modal
│   │   ├── ModelSelector.jsx    # Dropdown to switch Claude models
│   │   └── ExportButton.jsx     # Export conversation as Markdown
│   ├── hooks/
│   │   └── useChat.js           # Chat state, streaming, model selection
│   ├── pages/
│   │   └── ChatPage.jsx         # Main chat page
│   ├── styles/
│   │   └── index.css            # Tailwind base styles
│   └── App.jsx                  # App router
├── .env.example
├── tailwind.config.js
└── package.json
```

## 📋 Roadmap

- [x] Multi-conversation sidebar
- [x] Streaming responses
- [x] Markdown rendering
- [x] Syntax highlighting + copy button
- [x] Model selector (Claude 3 Haiku / Sonnet / Opus)
- [x] Export conversation as Markdown
- [ ] Mobile responsive tweaks
- [ ] Conversation search
- [ ] System prompt customization

## 📄 License

MIT
