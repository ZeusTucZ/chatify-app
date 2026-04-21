import { socket } from '../socket.js'

const ManageConnection = ({ isConnected }) => {
  const handleConnect = () => {
    if (!socket.connected) socket.connect()
  }

  const handleDisconnect = () => {
    if (socket.connected) socket.disconnect()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleConnect}
        disabled={isConnected}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Connect
      </button>
      <button
        onClick={handleDisconnect}
        disabled={!isConnected}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Disconnect
      </button>
    </div>
  )
}

export default ManageConnection
