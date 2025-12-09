import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { RoadmapView } from "./components/RoadmapView";
import { MessageSquare, Map, Sun, Moon } from "lucide-react";
import coddyLogo from "./assets/logo.svg";

type View = "chat" | "roadmap";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("chat");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-teal-50 via-white to-cyan-50"
      } flex flex-col`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b px-6 py-4 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={coddyLogo} alt="Coddy Logo" className="h-10 w-auto" />
            <div>
              <h1 className={isDarkMode ? "text-white" : "text-gray-900"}>
                Coddy
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your coding friends
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-lg transition-all ${
              isDarkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentView === "chat" && (
          <ChatInterface
            onNavigateToRoadmap={() => setCurrentView("roadmap")}
            isDarkMode={isDarkMode}
          />
        )}
        {currentView === "roadmap" && (
          <RoadmapView
            onNavigateToChat={() => setCurrentView("chat")}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-t px-6 py-3 shadow-lg`}
      >
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={() => setCurrentView("chat")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              currentView === "chat"
                ? "text-[#36BFB0] bg-teal-50"
                : isDarkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs">Chat</span>
          </button>
          <button
            onClick={() => setCurrentView("roadmap")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              currentView === "roadmap"
                ? "text-[#36BFB0] bg-teal-50"
                : isDarkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Roadmap</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
