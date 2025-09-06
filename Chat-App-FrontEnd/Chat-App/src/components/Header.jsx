export const Header = ({ username, onLogout }) => (
  <div className="flex justify-between items-center mb-3">
    <span className="text-gray-700 font-medium">Welcome, {username}!</span>
    <button
      onClick={onLogout}
      className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  </div>
);
