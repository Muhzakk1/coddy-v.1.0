import mongoose, { Document, Schema } from 'mongoose';

// Enum untuk status node
export type NodeStatus = 'locked' | 'in-progress' | 'completed';

// Struktur data untuk satu Node pembelajaran
interface RoadmapNode {
  id: string;          // ID unik untuk React Flow
  title: string;
  description: string;
  status: NodeStatus;
  type?: string;       // 'custom', 'default'
  position?: { x: number, y: number }; // Koordinat visual (opsional)
  prerequisites: string[]; // ID node lain yang harus selesai dulu
  resourceLink?: string;   // Link ke materi Dicoding
}

// Interface Utama Dokumen Roadmap
export interface IRoadmap extends Document {
  userId: mongoose.Types.ObjectId; // Referensi ke User
  title: string;       // misal: "Web Development Path"
  description: string;
  nodes: RoadmapNode[]; // Array semua materi
  progress: number;     // Persentase kelulusan (0-100)
  isActive: boolean;    // Apakah ini roadmap yang sedang dijalani?
  createdAt: Date;
  updatedAt: Date;
}

// Schema Node (Sub-document)
const RoadmapNodeSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['locked', 'in-progress', 'completed'], 
    default: 'locked' 
  },
  type: { type: String, default: 'custom' },
  position: {
    x: { type: Number },
    y: { type: Number }
  },
  prerequisites: [{ type: String }],
  resourceLink: { type: String }
});

// Schema Utama Roadmap
const RoadmapSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  nodes: [RoadmapNodeSchema], // Embedding array of nodes
  progress: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexing agar pencarian roadmap berdasarkan user cepat
RoadmapSchema.index({ userId: 1 });

export default mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);