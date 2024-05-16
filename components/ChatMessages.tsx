"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { useRouter } from "next/navigation";



interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export default function ChatMessages({
  companion,
  isLoading,
  messages
}: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);
const router = useRouter();
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    router.refresh();
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I'm ${companion.name}, ${companion.description}.`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}