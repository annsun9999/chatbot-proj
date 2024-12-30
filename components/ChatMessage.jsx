<div className="flex w-full max-w-3xl mx-4 sm:mx-auto">
  {/* Bot Avatar Container */}
  <div className="flex-none">
    <div
      className="flex items-center justify-center"
      style={{ width: '40px', height: '40px' }}
    >
      <img
        src="/bot-avatar.png"
        alt="Bot Avatar"
        className="bot-avatar"
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>

  {/* Message Content */}
  <div className="flex-1 ml-3">
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
        {message.content}
      </p>
    </div>
  </div>
</div>
