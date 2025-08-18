import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface EmojiPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker = ({ isVisible, onClose, onEmojiSelect }: EmojiPickerProps) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
    '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐', '✋', '🖖', '👏',
    '🙌', '🤲', '🤝', '🙏', '✍️', '💪', '🦵', '🦶', '👂', '🦻',
    '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '💋', '🩸'
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white border border-warm-200 rounded-lg shadow-lg p-4 w-80 z-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-warm-800">Выберите эмодзи</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="w-6 h-6 flex items-center justify-center hover:bg-warm-100 rounded text-lg transition-colors"
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;