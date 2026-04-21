import { useEffect, useState } from 'react'
import { socket } from './socket'
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const channels = ['canal 1', 'canal 2']
  const [activeChannel, setActiveChannel] = useState(channels[0])
  const [messagesByChannel, setMessagesByChannel] = useState({
    'canal 1': [],
    'canal 2': [],
  })
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const onUsersList = (users) => {
      setUsers(users);
    }

    const onConnect = () => {
      setIsConnected(true);
      socket.emit('join channel', { channel: activeChannel })
    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onChatMessage = (payload) => {
      setMessagesByChannel((current) => ({
        ...current,
        [payload.channel]: [...(current[payload.channel] ?? []), payload],
      }))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.on('users list', onUsersList)
    socket.on('chat message', onChatMessage)

    if (socket.connected) {
      socket.emit('join channel', { channel: activeChannel })
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

      socket.off('chat message', onChatMessage);
      socket.off('users list', onUsersList);
    }
  }, [activeChannel]);

  useEffect(() => {
    socket.emit('join channel', { channel: activeChannel })
  }, [activeChannel])

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <section className="mx-auto grid h-[calc(100vh-2rem)] max-w-7xl grid-cols-[240px_1fr_240px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <aside className="flex flex-col border-r border-slate-200">
          <div className="border-b border-slate-200 px-4 py-4">
            <h1 className="text-lg font-semibold">Channels</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Channels
              channels={channels}
              activeChannel={activeChannel}
              onSelectChannel={setActiveChannel}
            />
          </div>
        </aside>

        <section className="flex min-w-0 flex-col border-r border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <h2 className="text-lg font-semibold">{activeChannel}</h2>
            <ManageConnection isConnected={isConnected} />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <Chats messages={messagesByChannel[activeChannel] ?? []} />
          </div>

          <div className="border-t border-slate-200 p-4">
            <MyForm activeChannel={activeChannel} />
          </div>
        </section>

        <aside className="flex flex-col">
          <div className="border-b border-slate-200 px-4 py-4">
            <h2 className="text-lg font-semibold">Users</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Users users={users} />
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
