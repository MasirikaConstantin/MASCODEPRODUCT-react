import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FaUser, FaRobot } from 'react-icons/fa'; // Icônes FontAwesome

const ChatMessage = ({ sender, content }) => {
  const safeContent = typeof content === 'string' ? content : '';
  
  return (
    <div className={`chat ${sender === 'user' ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className={`w-10 rounded-full ${
          sender === 'user' 
            ? 'bg-primary text-primary-content' 
            : 'bg-secondary text-secondary-content'
        }`}>
          {sender === 'user' ? (
            <FaUser className="w-6 h-6 mx-auto mt-2" />
          ) : (
            <FaRobot className="w-6 h-6 mx-auto mt-2" />
          )}
        </div>
      </div>
      
      <div className="chat-header">
        {sender === 'user' ? 'Vous' : 'Assistant IA'}
        <time className="text-xs opacity-50 ml-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
      
      <div className={`chat-bubble ${
        sender === 'user'
          ? 'bg-primary text-primary-content'
          : 'bg-neutral text-secondary-content'
      } shadow-md`}>
        <ReactMarkdown 
          skipHtml={true}
          allowedElements={['p', 'strong', 'em', 'code', 'ul', 'ol', 'li']}
          components={{
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
            em: ({ node, ...props }) => <em className="italic" {...props} />,
            code: ({ node, ...props }) => (
              <code className="bg-neutral-content text-neutral-focus px-1 rounded" {...props} />
            ),
          }}
        >
          {safeContent}
        </ReactMarkdown>
      </div>
      
      <div className="chat-footer opacity-50">
        {sender === 'ia' && 'Vu'}
      </div>
    </div>
  );
};

export default ChatMessage;