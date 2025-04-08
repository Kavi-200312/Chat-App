import React, { useEffect, useRef } from "react";
import { UseChatStore } from "../Store/UseChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton ";
import { formatMessageTime } from "../lib/utlis";
import avatar from "../assets/avatar.png";
import { UseAuthStore } from "../Store/UseAuthStore";

const ChatContainer = () => {
  const {
    isMessagesLoading,
    selectedUser,
    getMessages,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = UseChatStore();
  const { authUser } = UseAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex flex-1 overflow-auto flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="border-amber-950 border flex flex-1 overflow-auto flex-col">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <a
                  href={
                    message.senderId === authUser._id
                      ? authUser.profilePic || avatar
                      : selectedUser.profilePic || avatar
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || avatar
                        : selectedUser.profilePic || avatar
                    }
                    alt="profile pic"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <a
                  href={message.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                  />
                </a>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
