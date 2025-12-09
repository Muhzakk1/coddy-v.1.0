interface UserMessageProps {
  content: string;
  timestamp: Date;
  isDarkMode: boolean;
}

export function UserMessage({ content, timestamp, isDarkMode }: UserMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="flex-1 max-w-2xl flex flex-col items-end">
        <div className="bg-[#36BFB0] rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg shadow-teal-500/20">
          <p className="text-white">{content}</p>
        </div>
        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1 mr-2`}>
          {timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}