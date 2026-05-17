# OpenClaude Clone

A Claude-inspired chat UI built with React and Tailwind CSS. Clean, dark-themed interface with multi-conversation support, powered by the Anthropic Claude API (or OpenAI).

## ✨ Features

- 💬 Multi-conversation sidebar (like Claude)
- 🌙 Dark theme UI with smooth message bubbles
- ⚡ Streaming-ready architecture
- 🔑 API key prompt on first load (stored in browser session only)
- 📱 Responsive layout

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
│   │   └── claude.js        # API adapter (Anthropic / OpenAI)
│   ├── components/
│   │   ├── Sidebar.jsx      # Conversation list sidebar
│   │   ├── MessageBubble.jsx # Individual chat message
│   │   ├── ChatInput.jsx    # Input bar with send button
│   │   └── ApiKeyModal.jsx  # API key entry modal
│   ├── hooks/
│   │   └── useChat.js       # Chat state & logic
│   ├── pages/
│   │   └── ChatPage.jsx     # Main chat page
│   ├── styles/
│   │   └── index.css        # Tailwind base styles
│   ├── utils/               # Utility helpers (coming soon)
│   └── App.jsx              # App router
├── .env.example
├── tailwind.config.js
└── package.json
```

## 🔧 Switching to OpenAI

Open `src/api/claude.js` and replace the fetch call with the OpenAI API endpoint and format. The hook and UI are model-agnostic.

## 📋 Roadmap

- [ ] Streaming responses
- [ ] Markdown rendering in messages
- [ ] Code block syntax highlighting
- [ ] Model selector (Claude 3 Haiku / Sonnet / Opus)
- [ ] Export conversation as Markdown
- [ ] Mobile responsive tweaks

## 📄 License

MIT
