import React, { useState } from "react";

export const MessageItem = ({ msg, isOwn }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = msg.message.split(" ").length > 30;
  const isSystem = msg.userName === "system";

  return (
    <div className={`mb-2 flex ${isSystem ? "justify-center" : isOwn ? "justify-end" : "justify-start"}`}>
      {isSystem ? (
        <span className="text-gray-500 italic text-sm">{msg.message}</span>
      ) : (
        <div
          className={`relative inline-block px-3 py-2 rounded-2xl max-w-[70%] break-words ${
            isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}>
          {!isOwn && (
            <div className="text-xs font-semibold mb-1 text-purple-600">
              {msg.userName}
            </div>
          )}

          {/* Message */}
          <p className={`whitespace-pre-wrap ${!expanded ? "line-clamp-5" : ""}`}>
            {msg.message}
          </p>

          {/* Time and Read More */}
          <div className="flex justify-between items-end mt-1 text-[10px]">
            <span className={`${isOwn ? "text-white/70" : "text-gray-500"} whitespace-nowrap`}>
              {msg.time || ""}
            </span>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={`${isOwn ? "text-white/80" : "text-blue-600"} underline ml-2`}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
