import { motion } from 'motion/react';

interface QuickReplyButtonsProps {
  replies: string[];
  onSelect: (reply: string) => void;
  isDarkMode: boolean;
}

export function QuickReplyButtons({ replies, onSelect, isDarkMode }: QuickReplyButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply, index) => (
        <motion.button
          key={reply}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(reply)}
          className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-teal-400 text-teal-300 hover:bg-gray-600' : 'bg-white border-teal-200 text-[#36BFB0] hover:bg-teal-50'} border-2 rounded-full hover:border-teal-300 transition-all shadow-sm hover:shadow-md`}
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}