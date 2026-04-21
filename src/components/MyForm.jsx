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
        <div className="flex items-center gap-3">
            <input 
                type="text"
                name="message"
                value={message}
                onChange={handleOnChange}
                placeholder="Write a message..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
                <button
                    onClick={handleClick}
                    className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-white"
                >
                    Send
                </button>
        </div>
    )
}

export default MyForm;
