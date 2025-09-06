export const UsernameForm = ({ username, onChange, onJoin }) => (
  <div className="flex flex-col gap-4 items-center justify-center h-full">
    <h2 className="text-2xl font-bold text-gray-700">Enter Your Name</h2>
    <div className="flex gap-2 w-full max-w-sm">
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onKeyDown={(e) => e.key === "Enter" && onJoin()}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onJoin}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Join
      </button>
    </div>
  </div>
);
