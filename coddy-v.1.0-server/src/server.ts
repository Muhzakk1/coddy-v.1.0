import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSocketController } from './sockets/socketController';
import User from './models/User'; 
import { CourseService } from './services/CourseService';
import { ChatHistoryService } from './services/ChatHistoryService';
import { TutorialService } from './services/TutorialService';

dotenv.config();

const app = express();
const server = http.createServer(app);

// 1. Middleware Basic
app.use(cors());
app.use(express.json());

// 2. Setup Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/learning_buddy';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 3. Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Ubah ini ke URL Front-End di production (misal: http://localhost:5173)
    methods: ["GET", "POST"]
  }
});

// --- TAMBAHAN BARU: API Routes ---

// 1. Endpoint: Ambil Semua Learning Path (Untuk Menu Pilihan)
app.get('/api/paths', async (req, res) => {
  try {
    const paths = await CourseService.getAllPaths();
    res.json(paths);
  } catch (error) {
    res.status(500).json({ error: 'Internal Error' });
  }
});

// 1. Get All Sessions (Sidebar)
app.get('/api/history', async (req, res) => {
  const { userId } = req.query;
  if (!userId) { res.status(400).json({error: 'No User ID'}); return; }
  
  const sessions = await ChatHistoryService.getUserSessions(userId as string);
  res.json(sessions);
});

// 2. Get Single Session Messages
app.get('/api/history/:sessionId', async (req, res) => {
  const session = await ChatHistoryService.getSessionById(req.params.sessionId);
  res.json(session);
});

// 3. Create New Session
app.post('/api/history', async (req, res) => {
  const { userId } = req.body;
  const session = await ChatHistoryService.createSession(userId);
  res.json(session);
});

// 4. Delete Session
app.delete('/api/history/:sessionId', async (req, res) => {
  await ChatHistoryService.deleteSession(req.params.sessionId);
  res.json({ success: true });
});

// 2. Endpoint: Ambil Detail Roadmap berdasarkan ID Path
app.get('/api/roadmap/:pathId', async (req, res) => {
  try {
    const { pathId } = req.params;
    const roadmapData = await CourseService.getRoadmapById(pathId);
    
    if (!roadmapData) {
      res.status(404).json({ error: 'Roadmap not found' });
      return;
    }

    res.json({ status: 'success', data: roadmapData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tutorials/:courseId', async (req, res) => {
  const data = await TutorialService.getTutorialsByCourseId(req.params.courseId);
  res.json(data);
});

// 4. Initialize Socket Logic
setupSocketController(io);

// 5. Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});