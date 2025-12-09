import coddyLogo from "../assets/logo.svg";

interface BotMessageProps {
  content: string;
  timestamp: Date;
  isDarkMode: boolean;
}

export function BotMessage({
  content,
  timestamp,
  isDarkMode,
}: BotMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-[#36BFB0] flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30">
        <img src={coddyLogo} alt="Coddy" className="h-10 w-auto" />
      </div>
      <div className="flex-1 max-w-2xl">
        <div
          className={`${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-100 text-gray-800"
          } rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border`}
        >
          <p>{content}</p>
        </div>
        <p
          className={`text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          } mt-1 ml-2`}
        >
          {timestamp.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
