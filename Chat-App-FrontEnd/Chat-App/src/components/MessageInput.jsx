import { useEffect } from "react";
import { useRef } from "react";

export const MessageInput = ({ message, setMessage, onSend, onTyping }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onTyping();
        }}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
      />
      <button
        onClick={onSend}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
};
