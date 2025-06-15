import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ChatMessage from '@/Components/ChatMessage';
import BaseLayout from '@/Layouts/Base';

export default function ChatPage() {
  const { messages: initialMessages } = usePage().props;
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Met à jour les messages et scroll vers le bas
  useEffect(() => {
    setMessages(initialMessages);
    scrollToBottom();
  }, [initialMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      await router.post('/chat/send', { message: input }, {
        preserveScroll: true,
        onSuccess: () => {
          setInput('');
          scrollToBottom();
        },
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)] container mx-auto max-w-3xl p-4">
        <Head title="Chat IA" />
        
        {/* Zone de messages avec défilement automatique */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={`${msg.sender}-${index}`} 
              sender={msg.sender} 
              content={msg.content} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie fixe en bas */}
        <form onSubmit={handleSubmit} className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Écrivez un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary join-item"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : 'Envoyer'}
          </button>
        </form>
      </div>
    </BaseLayout>
  );
}