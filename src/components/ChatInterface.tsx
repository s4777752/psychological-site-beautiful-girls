import React, { useRef, useEffect } from 'react';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import { useChatLogic } from '@/hooks/useChatLogic';
import { ChatInterfaceProps } from '@/types/chat';

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  userType, 
  recipientName
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    newMessage,
    setNewMessage,
    showEmojiPicker,
    setShowEmojiPicker,
    isRecording,
    recordingTime,
    inputRef,
    fileInputRef,
    handleSendMessage,
    handleKeyPress,
    handleFileSelect,
    handleFileUpload,
    handleEmojiSelect,
    toggleEmojiPicker,
    startRecording,
    stopRecording,
    cancelRecording,
    deleteMessage
  } = useChatLogic(userType);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const unreadCount = messages.filter(m => !m.read && m.sender !== userType).length;

  return (
    <div className="flex flex-col h-[600px]">
      <ChatHeader 
        recipientName={recipientName}
        userType={userType}
        unreadCount={unreadCount}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto border-x border-warm-200 bg-warm-50">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => {
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="bg-warm-200 text-warm-700 px-3 py-1 rounded-full text-xs">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                
                <MessageBubble
                  message={message}
                  userType={userType}
                  onDelete={deleteMessage}
                />
              </div>
            );
          })}
          
          {/* Typing indicator (можно добавить позже) */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        isRecording={isRecording}
        recordingTime={recordingTime}
        inputRef={inputRef}
        fileInputRef={fileInputRef}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        onFileSelect={handleFileSelect}
        onFileUpload={handleFileUpload}
        onEmojiSelect={handleEmojiSelect}
        onToggleEmojiPicker={toggleEmojiPicker}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onCancelRecording={cancelRecording}
      />
    </div>
  );
};

export default ChatInterface;