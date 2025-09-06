export const OnlineUsers = ({ users }) => (
  <div className="mb-3 text-sm text-gray-600">
    <strong>Online Users:</strong> {users.join(", ")}
  </div>
);
