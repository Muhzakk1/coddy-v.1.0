# Coddy - Conversational Learning Platform

Platform pembelajaran coding dengan pendekatan conversational-first, di mana seluruh pengalaman pengguna (onboarding, asesmen, roadmap, tracking) terjadi dalam satu antarmuka chat yang modern dan interaktif.

## 🚀 Fitur Utama

- **Onboarding Percakapan Interaktif**: Pengalaman onboarding yang natural melalui chat
- **Roadmap Visual Adaptif**: Visualisasi learning path menggunakan React Flow
- **Progress Tracking Proaktif**: Sistem tracking pembelajaran yang real-time
- **Sistem Achievement**: Motivasi pengguna dengan badge dan reward
- **Rekomendasi Kelas Kontekstual**: Saran kelas yang disesuaikan dengan profil user
- **Dark Mode**: Tema gelap untuk kenyamanan mata
- **Animasi Smooth**: Transisi dan animasi menggunakan Framer Motion

## 🛠️ Teknologi

- **React 18** - Library UI
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animasi
- **React Flow** - Visualisasi roadmap
- **Lucide React** - Icons

## 📁 Struktur Folder

```
coddy-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── figma/      # Figma-imported components
│   │   ├── ui/         # ShadCN UI components
│   │   ├── ChatInterface.jsx
│   │   ├── RoadmapView.jsx
│   │   ├── LearningPathSelection.jsx
│   │   └── ...
│   ├── styles/         # Global styles
│   │   └── globals.css
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md          # Documentation
```

## 🎨 Design System

- **Primary Color**: #36BFB0 (Teal)
- **Typography**: Custom font sizing dengan CSS variables
- **Spacing**: Tailwind default spacing scale
- **Animations**: Smooth transitions dengan Motion

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Learning Paths

- Web Development
- Mobile Development
- Data Science
- Machine Learning
- Full Stack Development
- UI/UX Design
- Backend Development
- Cyber Security

## 📱 Responsive Design

Aplikasi fully responsive dan dapat digunakan di berbagai ukuran layar:
- Desktop (>= 1024px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🌙 Dark Mode

Toggle dark mode tersedia di header untuk kenyamanan pengguna dalam berbagai kondisi pencahayaan.

## 🏆 Achievement System

5 tipe achievement:
- First Course: Badge pertama setelah menyelesaikan kelas pertama
- Streak: Badge untuk konsistensi belajar
- Level Up: Badge saat naik level
- Mastery: Badge untuk menguasai topik tertentu
- Milestone: Badge untuk pencapaian besar

## 📝 License

MIT License - feel free to use this project for learning purposes.
