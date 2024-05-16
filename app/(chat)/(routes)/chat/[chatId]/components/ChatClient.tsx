"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import { ChatMessageProps } from "@/components/ChatMessage";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatForm from "@/components/ChatForm";
import axios from "axios";


interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export default function ChatClient({ companion }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );



const getAIMessages=async()=>{

    
   
}
getAIMessages();
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");
      },
      onResponse(response) {
          console.log("onResponse", response);
          console.log("messages", messages);
          router.refresh();
          window.location.reload();
          setInput("");
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        handleInputChange={handleInputChange}
        input={input}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}