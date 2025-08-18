import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

export const useChatLogic = (userType: 'client' | 'psychologist', recipientName?: string) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!recipientName) return [];
    const saved = localStorage.getItem(`messages_${recipientName}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Загружаем сообщения при смене клиента
  useEffect(() => {
    if (recipientName) {
      const saved = localStorage.getItem(`messages_${recipientName}`);
      setMessages(saved ? JSON.parse(saved) : []);
    } else {
      setMessages([]);
    }
  }, [recipientName]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: userType,
        timestamp: new Date(),
        read: false
      };

      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      setNewMessage('');
      
      // Сохраняем сообщения для конкретного клиента
      if (recipientName) {
        localStorage.setItem(`messages_${recipientName}`, JSON.stringify(updatedMessages));
      }
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

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const voiceMessage: Message = {
          id: Date.now().toString(),
          text: 'Голосовое сообщение',
          sender: userType,
          timestamp: new Date(),
          read: false,
          voice: {
            url: audioUrl,
            duration: recordingTime
          }
        };

        setMessages(prev => [...prev, voiceMessage]);
        
        // Останавливаем все треки
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Запускаем таймер
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      alert('Не удалось получить доступ к микрофону');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  return {
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
  };
};