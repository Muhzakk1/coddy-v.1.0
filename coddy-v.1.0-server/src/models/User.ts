import mongoose, { Document, Schema } from 'mongoose';

// 1. Definisikan Enum untuk Conversation State
export enum ConversationState {
  ONBOARDING = 'STATE_ONBOARDING',   // User baru, pengenalan
  ASSESSMENT = 'STATE_ASSESSMENT',   // Sedang kuis penentuan level
  IDLE = 'STATE_IDLE',               // Mode bebas, siap tanya jawab
  AWAITING_CHOICE = 'STATE_AWAITING_CHOICE' // Menunggu user memilih opsi (misal: learning path)
}

// 2. Interface TypeScript untuk User (Type Safety di Code)
export interface IUser extends Document {
  name: string;
  email?: string; // Optional, jika nanti ada login
  avatar?: string;
  xp: number;
  level: string; // 'Beginner', 'Intermediate', 'Advanced'
  
  // State Management
  currentState: ConversationState;
  
  // Metadata tambahan untuk konteks ML
  preferences: {
    interestedPath?: string; // e.g., 'Web Development'
    codingExperience?: string; // e.g., 'No Code', 'Basic Python'
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// 3. Mongoose Schema Definition (Validasi di Database)
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // sparse: allow null duplicates
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: String, default: 'Beginner' },
  
  currentState: { 
    type: String, 
    enum: Object.values(ConversationState), 
    default: ConversationState.ONBOARDING 
  },
  
  preferences: {
    interestedPath: { type: String },
    codingExperience: { type: String }
  }
}, {
  timestamps: true // Otomatis buat createdAt & updatedAt
});

// 4. Export Model
export default mongoose.model<IUser>('User', UserSchema);