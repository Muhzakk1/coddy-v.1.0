import ChatSession from '../models/ChatSession';
import mongoose from 'mongoose';

export const ChatHistoryService = {
  // 1. Ambil List History (Hanya Judul & ID)
  getUserSessions: async (userId: string) => {
    return await ChatSession.find({ userId })
      .select('title updatedAt createdAt')
      .sort({ updatedAt: -1 });
  },

  // 2. Ambil Detail Satu Sesi (Beserta isinya)
  getSessionById: async (sessionId: string) => {
    return await ChatSession.findById(sessionId);
  },

  // 3. Buat Sesi Baru (DENGAN SAPAAN OTOMATIS)
  createSession: async (userId: string, firstMessage?: string) => {
    // Tentukan Judul
    const title = firstMessage ? firstMessage.substring(0, 30) + '...' : 'Percakapan Baru';
    
    // Tentukan Pesan Awal (Greeting)
    const initialMessages = [];
    
    // Jika tidak ada pesan user (artinya sesi murni baru), Bot menyapa duluan
    if (!firstMessage) {
        initialMessages.push({
            role: 'bot',
            content: "Halo! 👋 Saya Coddy, asisten belajar codingmu. \n\nSiapa nama kamu?.",
            timestamp: new Date()
        });
    } else {
        // Jika sesi dibuat karena user mengetik pesan pertama
        initialMessages.push({
            role: 'user',
            content: firstMessage,
            timestamp: new Date()
        });
    }
    
    const newSession = await ChatSession.create({
      userId,
      title,
      messages: initialMessages // <--- Isi pesan langsung
    });
    
    return newSession;
  },

  // 4. Tambah Pesan ke Sesi
  addMessage: async (sessionId: string, role: 'user' | 'bot', content: string) => {
    return await ChatSession.findByIdAndUpdate(
      sessionId,
      { 
        $push: { messages: { role, content, timestamp: new Date() } } 
      },
      { new: true }
    );
  },

  // 5. Update Judul (Opsional, misal user rename)
  renameSession: async (sessionId: string, newTitle: string) => {
      return await ChatSession.findByIdAndUpdate(sessionId, { title: newTitle });
  },

  // 6. Hapus Sesi
  deleteSession: async (sessionId: string) => {
    return await ChatSession.findByIdAndDelete(sessionId);
  }
};