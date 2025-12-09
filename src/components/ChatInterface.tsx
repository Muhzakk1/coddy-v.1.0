import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";
import { QuickReplyButtons } from "./QuickReplyButtons";
import { CourseCard } from "./CourseCard";
import { ProgressNotification } from "./ProgressNotification";
import { RoadmapInChat } from "./RoadmapInChat";
import { AchievementNotification } from "./AchievementNotification";
import coddyLogo from "../assets/logo.svg";

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  courseRecommendations?: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    progress?: number;
    level: string;
  }>;
  notification?: {
    type: "roadmap-update" | "milestone" | "reminder";
    message: string;
  };
  showRoadmap?: boolean;
  achievement?: {
    title: string;
    description: string;
    type: "first-course" | "streak" | "level-up" | "mastery" | "milestone";
    reward?: string;
  };
}

interface ChatInterfaceProps {
  onNavigateToRoadmap: () => void;
  isDarkMode: boolean;
}

export function ChatInterface({
  onNavigateToRoadmap,
  isDarkMode,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Halo! 👋 Saya Coddy, mentor AI Anda. Saya di sini untuk membantu Anda merencanakan perjalanan belajar yang sempurna!",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "bot",
      content: "Untuk memulai, boleh saya tahu nama Anda?",
      timestamp: new Date(),
      quickReplies: [],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (
    content: string,
    options?: {
      quickReplies?: string[];
      courseRecommendations?: Message["courseRecommendations"];
      notification?: Message["notification"];
      showRoadmap?: boolean;
      achievement?: Message["achievement"];
    }
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      ...options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      handleBotResponse(messageText);
    }, 1000);
  };

  const handleBotResponse = (userMessage: string) => {
    const stage = conversationStage;

    if (stage === 0) {
      // After name
      addBotMessage(`Senang berkenalan dengan Anda! 😊`);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            "Apa yang ingin Anda pelajari? Pilih area yang paling menarik bagi Anda:",
            {
              quickReplies: [
                "Web Development",
                "Mobile Development",
                "Data Science",
                "Machine Learning",
              ],
            }
          );
          setConversationStage(1);
        }, 1000);
      }, 500);
    } else if (stage === 1) {
      // After interest selection
      addBotMessage(
        `Pilihan yang bagus! ${userMessage} adalah bidang yang sangat menarik dan banyak dicari.`
      );
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("Bagaimana tingkat pengalaman Anda saat ini?", {
            quickReplies: ["Pemula", "Menengah", "Mahir"],
          });
          setConversationStage(2);
        }, 1000);
      }, 500);
    } else if (stage === 2) {
      // After level selection
      addBotMessage("Sempurna! Saya memahami level Anda sekarang.");
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            "Berapa banyak waktu yang bisa Anda dedikasikan untuk belajar setiap minggu?",
            {
              quickReplies: ["5-10 jam", "10-15 jam", "15-20 jam", "20+ jam"],
            }
          );
          setConversationStage(3);
        }, 1000);
      }, 500);
    } else if (stage === 3) {
      // After time commitment
      addBotMessage(
        "Baik, saya sedang menganalisis profil Anda dan membuat roadmap pembelajaran yang dipersonalisasi..."
      );
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("✨ Roadmap Anda sudah siap!", {
            notification: {
              type: "roadmap-update",
              message: "Roadmap pembelajaran personal Anda telah dibuat!",
            },
          });
          setTimeout(() => {
            addBotMessage(
              "Berikut adalah visualisasi roadmap pembelajaran Anda. Anda dapat meng-zoom dan menggeser untuk melihat detail:",
              {
                showRoadmap: true,
              }
            );
            setTimeout(() => {
              addBotMessage(
                "Berdasarkan profil Anda, saya merekomendasikan memulai dengan kelas-kelas berikut:",
                {
                  courseRecommendations: [
                    {
                      id: "1",
                      title: "Dasar Pemrograman Web",
                      description:
                        "Pelajari HTML, CSS, dan JavaScript dari nol hingga mahir",
                      thumbnail:
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
                      level: "Pemula",
                      progress: 0,
                    },
                    {
                      id: "2",
                      title: "React Fundamentals",
                      description: "Bangun aplikasi web modern dengan React",
                      thumbnail:
                        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
                      level: "Pemula",
                      progress: 0,
                    },
                    {
                      id: "3",
                      title: "JavaScript ES6+",
                      description: "Kuasai fitur-fitur modern JavaScript",
                      thumbnail:
                        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
                      level: "Pemula",
                      progress: 0,
                    },
                  ],
                }
              );
              setTimeout(() => {
                addBotMessage(
                  'Anda juga dapat melihat roadmap lengkap dengan tampilan detail di tab "Roadmap" di bawah. 🗺️',
                  {
                    quickReplies: [
                      "Lihat Roadmap Detail",
                      "Mulai Belajar",
                      "Tanya Sesuatu",
                    ],
                  }
                );
                setConversationStage(4);
              }, 500);
            }, 800);
          }, 800);
        }, 1500);
      }, 1000);
    } else if (stage === 4) {
      // After roadmap created
      if (
        userMessage === "Lihat Roadmap" ||
        userMessage === "Lihat Roadmap Detail"
      ) {
        onNavigateToRoadmap();
        return;
      } else if (userMessage === "Mulai Belajar") {
        addBotMessage(
          "Luar biasa! Mari kita mulai dengan kelas pertama. Saya akan membantu Anda step by step! 🚀"
        );
        setTimeout(() => {
          addBotMessage(
            'Klik "Selesaikan Kelas Pertama" untuk simulasi menyelesaikan kelas dan dapatkan achievement! 🎯',
            {
              quickReplies: [
                "Selesaikan Kelas Pertama",
                "Lihat Progress",
                "Tanya Sesuatu",
              ],
            }
          );
        }, 1000);
        setConversationStage(5);
      } else if (userMessage === "Tanya Sesuatu") {
        addBotMessage(
          "Tentu! Apa yang ingin Anda tanyakan? Saya di sini untuk membantu Anda. 😊",
          {
            quickReplies: [
              "Berapa lama waktu yang dibutuhkan?",
              "Apakah ada sertifikat?",
              "Bisakah saya ubah roadmap?",
            ],
          }
        );
      } else {
        addBotMessage(
          "Saya akan terus membantu Anda dalam perjalanan belajar ini. Jangan ragu untuk bertanya kapan saja! 💡",
          {
            quickReplies: [
              "Lihat Roadmap Detail",
              "Mulai Belajar",
              "Tanya Sesuatu",
            ],
          }
        );
      }
    } else if (stage === 5) {
      // Course completion simulation
      if (userMessage === "Selesaikan Kelas Pertama") {
        addBotMessage("Memproses penyelesaian kelas...");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBotMessage(
              '🎊 Selamat! Anda telah menyelesaikan kelas "Dasar Pemrograman Web"!'
            );
            setTimeout(() => {
              addBotMessage("", {
                achievement: {
                  title: "🌟 First Step!",
                  description:
                    "Anda telah menyelesaikan kelas pertama Anda! Perjalanan seribu mil dimulai dengan satu langkah.",
                  type: "first-course",
                  reward: "+50 XP",
                },
              });
              setTimeout(() => {
                addBotMessage(
                  "Luar biasa! Roadmap Anda telah diperbarui. Kelas berikutnya sudah terbuka! 🔓",
                  {
                    notification: {
                      type: "roadmap-update",
                      message: "Kelas baru telah terbuka di roadmap Anda!",
                    },
                  }
                );
                setTimeout(() => {
                  addBotMessage("Apa yang ingin Anda lakukan selanjutnya?", {
                    quickReplies: [
                      "Lanjut Kelas Berikutnya",
                      "Selesaikan 3 Kelas",
                      "Lihat Roadmap Detail",
                    ],
                  });
                  setConversationStage(6);
                }, 800);
              }, 500);
            }, 600);
          }, 1000);
        }, 800);
      } else if (userMessage === "Lihat Progress") {
        addBotMessage(
          "Anda saat ini berada di tahap awal pembelajaran. Mari selesaikan kelas pertama untuk membuka lebih banyak konten! 📚",
          {
            quickReplies: ["Selesaikan Kelas Pertama", "Lihat Roadmap Detail"],
          }
        );
      } else if (userMessage === "Tanya Sesuatu") {
        addBotMessage("Tentu! Apa yang ingin Anda tanyakan? 😊", {
          quickReplies: [
            "Berapa lama waktu yang dibutuhkan?",
            "Apakah ada sertifikat?",
          ],
        });
      }
    } else if (stage === 6) {
      // After first course completion
      if (userMessage === "Lanjut Kelas Berikutnya") {
        addBotMessage('Memulai kelas "React Fundamentals"... 🚀');
        setTimeout(() => {
          addBotMessage(
            "Selamat belajar! Saya akan memberitahu Anda ketika ada update. 💪",
            {
              quickReplies: [
                "Selesaikan Kelas Ini Juga",
                "Lihat Roadmap Detail",
              ],
            }
          );
        }, 1000);
      } else if (userMessage === "Selesaikan 3 Kelas") {
        addBotMessage("Memproses penyelesaian 3 kelas...");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBotMessage("🎉 Luar biasa! Anda telah menyelesaikan 3 kelas!");
            setTimeout(() => {
              addBotMessage("", {
                achievement: {
                  title: "🔥 On Fire!",
                  description:
                    "Anda telah menyelesaikan 3 kelas berturut-turut! Momentum pembelajaran Anda luar biasa!",
                  type: "streak",
                  reward: '+150 XP & Badge "Fast Learner"',
                },
              });
              setTimeout(() => {
                addBotMessage("", {
                  achievement: {
                    title: "🎯 Foundation Master",
                    description:
                      "Anda telah menyelesaikan semua kelas di level Foundation! Siap untuk level berikutnya?",
                    type: "level-up",
                    reward: "+200 XP & Unlock Intermediate Level",
                  },
                });
                setTimeout(() => {
                  addBotMessage(
                    "Selamat! Anda telah naik ke level Intermediate! 🚀",
                    {
                      notification: {
                        type: "milestone",
                        message:
                          "Level Up! Anda sekarang di level Intermediate!",
                      },
                    }
                  );
                  setTimeout(() => {
                    addBotMessage(
                      "Kelas-kelas baru di level Intermediate sudah terbuka untuk Anda. Apa yang ingin Anda lakukan?",
                      {
                        quickReplies: [
                          "Mulai Level Intermediate",
                          "Lihat Semua Achievement",
                          "Lihat Roadmap Detail",
                        ],
                      }
                    );
                    setConversationStage(7);
                  }, 800);
                }, 1000);
              }, 1000);
            }, 600);
          }, 1000);
        }, 800);
      } else if (userMessage === "Lihat Roadmap Detail") {
        onNavigateToRoadmap();
      } else if (userMessage === "Selesaikan Kelas Ini Juga") {
        addBotMessage("Memproses...");
        setTimeout(() => {
          addBotMessage(
            '🎊 Selamat! Anda telah menyelesaikan "React Fundamentals"!',
            {
              quickReplies: ["Selesaikan 3 Kelas", "Lihat Progress"],
            }
          );
        }, 1000);
      }
    } else if (stage === 7) {
      // Advanced stage
      if (userMessage === "Mulai Level Intermediate") {
        addBotMessage(
          "Sempurna! Level Intermediate akan mengajarkan konsep yang lebih mendalam. Siap untuk tantangan baru? 💪",
          {
            quickReplies: ["Ya, mulai sekarang!", "Lihat Roadmap Detail"],
          }
        );
      } else if (userMessage === "Lihat Semua Achievement") {
        addBotMessage("Berikut adalah achievement yang telah Anda raih:");
        setTimeout(() => {
          addBotMessage(
            "🌟 First Step! (+50 XP)\n🔥 On Fire! (+150 XP)\n🎯 Foundation Master (+200 XP)\n\nTotal XP: 400 | Level: Intermediate",
            {
              quickReplies: ["Lanjutkan Belajar", "Lihat Roadmap Detail"],
            }
          );
        }, 500);
      } else if (userMessage === "Lihat Roadmap Detail") {
        onNavigateToRoadmap();
      } else if (userMessage === "Ya, mulai sekarang!") {
        addBotMessage(
          "Luar biasa! Mari kita mulai perjalanan Intermediate Anda! 🚀"
        );
      } else if (userMessage === "Lanjutkan Belajar") {
        addBotMessage(
          "Bagus! Mari lanjutkan pembelajaran Anda. Pilih kelas yang ingin Anda ambil selanjutnya! 📚",
          {
            quickReplies: ["Mulai Level Intermediate", "Lihat Roadmap Detail"],
          }
        );
      }
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === "bot" ? (
                <div className="space-y-3">
                  <BotMessage
                    content={message.content}
                    timestamp={message.timestamp}
                    isDarkMode={isDarkMode}
                  />
                  {message.notification && (
                    <ProgressNotification
                      type={message.notification.type}
                      message={message.notification.message}
                    />
                  )}
                  {message.showRoadmap && (
                    <div className="ml-14 mt-3">
                      <RoadmapInChat isDarkMode={isDarkMode} />
                    </div>
                  )}
                  {message.achievement && (
                    <AchievementNotification
                      achievement={message.achievement}
                    />
                  )}
                  {message.courseRecommendations && (
                    <div className="ml-14 space-y-3">
                      {message.courseRecommendations.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  )}
                  {message.quickReplies && (
                    <div className="ml-14">
                      <QuickReplyButtons
                        replies={message.quickReplies}
                        onSelect={handleSendMessage}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <UserMessage
                  content={message.content}
                  timestamp={message.timestamp}
                  isDarkMode={isDarkMode}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#36BFB0] flex items-center justify-center flex-shrink-0">
                <img src={coddyLogo} alt="Coddy" className="h-10 w-auto" />
              </div>
              <div
                className={`${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-100"
                } rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border`}
              >
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className={`border-t ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        } px-4 py-4`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ketik pesan Anda..."
              className={`flex-1 px-4 py-3 border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#36BFB0] focus:border-transparent`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-[#36BFB0] text-white rounded-xl hover:bg-[#2da89a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
