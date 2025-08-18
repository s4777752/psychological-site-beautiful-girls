import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import EmojiPicker from '@/components/EmojiPicker';
import VoiceRecorder from '@/components/VoiceRecorder';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  isRecording: boolean;
  recordingTime: number;
  inputRef: React.RefObject<HTMLInputElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFileSelect: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect: (emoji: string) => void;
  onToggleEmojiPicker: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCancelRecording: () => void;
}

const MessageInput = ({
  newMessage,
  setNewMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  isRecording,
  recordingTime,
  inputRef,
  fileInputRef,
  onSendMessage,
  onKeyPress,
  onFileSelect,
  onFileUpload,
  onEmojiSelect,
  onToggleEmojiPicker,
  onStartRecording,
  onStopRecording,
  onCancelRecording
}: MessageInputProps) => {
  return (
    <Card className="border-warm-200 rounded-t-none">
      <CardContent className="p-4">
        <div className="flex items-end space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onFileSelect}
            className="border-warm-300 text-warm-600 hover:bg-warm-100"
          >
            <Icon name="Paperclip" size={16} />
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFileUpload}
            className="hidden"
            accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
          />
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Напишите сообщение..."
              className="
                w-full px-4 py-3 border-2 border-warm-400 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-600
                bg-white text-warm-800 placeholder-warm-500
                resize-none shadow-sm
              "
            />
            
            <EmojiPicker
              isVisible={showEmojiPicker}
              onClose={() => setShowEmojiPicker(false)}
              onEmojiSelect={onEmojiSelect}
            />
          </div>
          
          <Button 
            size="sm"
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
            className="bg-warm-600 hover:bg-warm-700 disabled:bg-warm-300"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
        
        <VoiceRecorder
          isRecording={isRecording}
          recordingTime={recordingTime}
          onCancel={onCancelRecording}
          onStop={onStopRecording}
        />

        <div className="flex items-center justify-between mt-2 text-xs text-warm-500">
          <span>Enter для отправки, Shift+Enter для новой строки</span>
          <div className="flex items-center space-x-2">
            <Icon 
              name="Smile" 
              size={14} 
              className="cursor-pointer hover:text-warm-600 transition-colors" 
              onClick={onToggleEmojiPicker}
            />
            <Icon 
              name={isRecording ? "Square" : "Mic"} 
              size={14} 
              className={`cursor-pointer transition-colors ${
                isRecording 
                  ? "text-red-500 hover:text-red-600 animate-pulse" 
                  : "hover:text-warm-600"
              }`}
              onClick={isRecording ? onStopRecording : onStartRecording}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageInput;