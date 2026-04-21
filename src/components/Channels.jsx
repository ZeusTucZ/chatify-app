const Channels = ({ channels, activeChannel, onSelectChannel }) => {
  return (
    <div className="space-y-2">
      {channels.map((channel) => (
        <button
          key={channel}
          type="button"
          onClick={() => onSelectChannel(channel)}
          className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
            activeChannel === channel
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {channel}
        </button>
      ))}
    </div>
  )
}

export default Channels;
