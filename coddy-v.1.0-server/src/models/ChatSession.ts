import mongoose, { Document, Schema } from 'mongoose';

interface IMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Percakapan Baru' },
  messages: [{
    role: { type: String, enum: ['user', 'bot'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Index biar loading history cepat
ChatSessionSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);