import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'psychologist';
  timestamp: Date;
  read: boolean;
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

interface ChatInterfaceProps {
  userType: 'client' | 'psychologist';
  recipientName: string;
  recipientAvatar?: string;
}

// Пустой список сообщений
const initialMessages: Message[] = [];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  userType, 
  recipientName,
  recipientAvatar 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: userType,
        timestamp: new Date(),
        read: false
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Проверка размера файла (максимум 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 10MB');
        return;
      }

      // Создаем URL для файла
      const fileUrl = URL.createObjectURL(file);
      
      const newFileMessage: Message = {
        id: Date.now().toString(),
        text: `Отправлен файл: ${file.name}`,
        sender: userType,
        timestamp: new Date(),
        read: false,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl
        }
      };

      setMessages(prev => [...prev, newFileMessage]);
      
      // Очищаем input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

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
      {/* Chat Header */}
      <Card className="border-warm-200 rounded-b-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-warm-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {recipientName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-warm-800 text-lg">{recipientName}</CardTitle>
                <p className="text-sm text-warm-600">
                  {userType === 'client' ? 'Ваш психолог' : 'Клиент'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Badge variant="destructive" className="bg-warm-600">
                  {unreadCount}
                </Badge>
              )}
              <Button size="sm" variant="outline" className="border-warm-300">
                <Icon name="Phone" size={16} />
              </Button>
              <Button size="sm" variant="outline" className="border-warm-300">
                <Icon name="Video" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

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
                
                <div className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${message.sender === userType ? 'order-2' : 'order-1'}`}>
                    <div className={`
                      px-4 py-2 rounded-lg
                      ${message.sender === userType 
                        ? 'bg-warm-600 text-white' 
                        : 'bg-white border border-warm-200 text-warm-800'
                      }
                    `}>
                      {message.file ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-3 bg-warm-100 rounded-lg">
                            <div className="flex-shrink-0">
                              {message.file.type.startsWith('image/') ? (
                                <Icon name="FileImage" size={20} className="text-warm-600" />
                              ) : message.file.type.startsWith('audio/') ? (
                                <Icon name="FileAudio" size={20} className="text-warm-600" />
                              ) : message.file.type.startsWith('video/') ? (
                                <Icon name="FileVideo" size={20} className="text-warm-600" />
                              ) : message.file.type === 'application/pdf' ? (
                                <Icon name="FileText" size={20} className="text-warm-600" />
                              ) : (
                                <Icon name="File" size={20} className="text-warm-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-warm-800 truncate">
                                {message.file.name}
                              </p>
                              <p className="text-xs text-warm-600">
                                {formatFileSize(message.file.size)}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = message.file!.url;
                                link.download = message.file!.name;
                                link.click();
                              }}
                              className="flex-shrink-0"
                            >
                              <Icon name="Download" size={14} />
                            </Button>
                          </div>
                          {message.file.type.startsWith('image/') && (
                            <div className="mt-2">
                              <img 
                                src={message.file.url} 
                                alt={message.file.name}
                                className="max-w-full h-auto rounded-lg"
                                style={{ maxHeight: '200px' }}
                              />
                            </div>
                          )}
                          {message.text && message.text !== `Отправлен файл: ${message.file.name}` && (
                            <p className="text-sm leading-relaxed mt-2">{message.text}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </div>
                    <div className={`
                      flex items-center space-x-1 mt-1 text-xs text-warm-500
                      ${message.sender === userType ? 'justify-end' : 'justify-start'}
                    `}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === userType && (
                        <Icon 
                          name={message.read ? "CheckCheck" : "Check"} 
                          size={12}
                          className={message.read ? "text-warm-600" : "text-warm-400"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-warm-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-warm-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-warm-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-warm-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <Card className="border-warm-200 rounded-t-none">
        <CardContent className="p-4">
          <div className="flex items-end space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleFileSelect}
              className="border-warm-300 text-warm-600 hover:bg-warm-100"
            >
              <Icon name="Paperclip" size={16} />
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
            />
            
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="
                  w-full px-4 py-3 border-2 border-warm-400 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-600
                  bg-white text-warm-800 placeholder-warm-500
                  resize-none shadow-sm
                "
              />
            </div>
            
            <Button 
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-warm-600 hover:bg-warm-700 disabled:bg-warm-300"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-warm-500">
            <span>Enter для отправки, Shift+Enter для новой строки</span>
            <div className="flex items-center space-x-2">
              <Icon name="Smile" size={14} className="cursor-pointer hover:text-warm-600" />
              <Icon name="Mic" size={14} className="cursor-pointer hover:text-warm-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;