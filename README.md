# Chatify — Real-Time Chat Frontend

Chatify is a real-time chat web app — a class project. This repository holds the
frontend. The backend lives in a separate repository,
[server-chatify](https://github.com/ZeusTucZ/server-chatify).

## What it does

- Two chat channels (`canal 1` and `canal 2`) with switching between them.
- Live list of connected users.
- Connect / disconnect controls and connection status.
- Message composer and live chat view; messages arrive in real time over
  Socket.io and are grouped per channel.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- `socket.io-client` 4.8

## Architecture

```text
Browser (this repo)
  ↔ Socket.io
Express + Socket.io server (server-chatify)
  ↔ PostgreSQL (messages table)
```

The server stores every message in PostgreSQL and, when a client reconnects,
replays the messages it missed (see the `server-chatify` README).

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default.

The frontend connects to the chat server at the URL in `VITE_SOCKET_URL`,
or `http://localhost:3000` if that variable is not set. Start the backend
first — see [server-chatify](https://github.com/ZeusTucZ/server-chatify) —
or the app will show as disconnected.

```bash
# example: point the frontend at a server on another host/port
VITE_SOCKET_URL=http://localhost:3000 npm run dev
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # ESLint
```

## Project structure

```text
src/
├── App.jsx              # channels, users and message state; Socket.io wiring
├── socket.js            # socket.io-client setup (autoConnect: false)
├── main.jsx
└── components/
    ├── Channels.jsx     # channel list and switching
    ├── Chats.jsx        # message list
    ├── ManageConnection.jsx  # connect / disconnect controls
    ├── MyForm.jsx       # message composer
    └── Users.jsx        # connected users list
```

## Current state and limitations

- Class project, work in progress.
- No tests, no CI, and no live demo URL.
- The frontend UI includes channel switching and a users list, and it emits a
  `join channel` event and listens for a `users list` event. The current
  server persists messages and replays missed ones on reconnect, but does not
  implement channel-scoped delivery, so treat the channel UI as in progress
  rather than fully wired end to end.
