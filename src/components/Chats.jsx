import { socket } from '../socket.js'

const Chats = ({ messages }) => {
  return (
    <section className="flex min-h-full flex-col gap-3 rounded-lg border border-slate-200 p-3 sm:p-4">
      {messages.length === 0 ? (
        <p className="text-sm text-slate-400">No hay mensajes en este canal.</p>
      ) : (
        messages.map((message, index) => {
          const isMine = message.senderId === socket.id

          return (
            <div
              key={`${message.channel}-${index}`}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <article
                className={`max-w-[88%] overflow-hidden rounded-lg px-4 py-3 text-sm sm:max-w-[80%] ${
                  isMine
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <p className="mb-1 break-all text-xs opacity-70">{message.senderId}</p>
                <p className="break-words">{message.message}</p>
              </article>
            </div>
          )
        })
      )}
    </section>
  )
}

export default Chats
