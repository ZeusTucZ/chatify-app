import { useState } from 'react'
import { socket } from '../socket.js'

const MyForm = ({ activeChannel }) => {
    const [message, setMessage] = useState('');

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (!message.trim()) return

        socket.emit('chat message', {
            channel: activeChannel,
            message: message.trim(),
        });
        setMessage('');
    }

    return (
        <form onSubmit={handleClick} className="flex gap-2 sm:items-center sm:gap-3">
            <input 
                type="text"
                name="message"
                value={message}
                onChange={handleOnChange}
                placeholder="Write a message..."
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
                <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white"
                >
                    Send
                </button>
        </form>
    )
}

export default MyForm;
