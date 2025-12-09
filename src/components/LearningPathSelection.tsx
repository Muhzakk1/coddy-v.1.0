import { motion } from 'motion/react';
import { Code, Smartphone, Database, Brain, Globe, Palette, Server, Shield } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  courses: number;
  duration: string;
  progress: number;
}

interface LearningPathSelectionProps {
  onSelectPath: (pathId: string) => void;
  isDarkMode: boolean;
}

export function LearningPathSelection({ onSelectPath, isDarkMode }: LearningPathSelectionProps) {
  const learningPaths: LearningPath[] = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Pelajari HTML, CSS, JavaScript, React, dan teknologi web modern',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      courses: 12,
      duration: '6-8 bulan',
      progress: 35,
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      description: 'Bangun aplikasi mobile dengan React Native dan Flutter',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500',
      courses: 10,
      duration: '5-7 bulan',
      progress: 0,
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Analisis data, machine learning, dan visualisasi data',
      icon: Database,
      color: 'from-green-500 to-teal-500',
      courses: 14,
      duration: '8-10 bulan',
      progress: 15,
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'Deep learning, AI, dan model prediktif',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      courses: 11,
      duration: '7-9 bulan',
      progress: 0,
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'Frontend dan Backend development end-to-end',
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      courses: 15,
      duration: '8-12 bulan',
      progress: 60,
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Design thinking, prototyping, dan user research',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      courses: 8,
      duration: '4-6 bulan',
      progress: 0,
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Server, database, API, dan cloud computing',
      icon: Server,
      color: 'from-teal-500 to-green-500',
      courses: 13,
      duration: '7-9 bulan',
      progress: 25,
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Keamanan jaringan, ethical hacking, dan cryptography',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      courses: 9,
      duration: '6-8 bulan',
      progress: 0,
    },
  ];

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-teal-50 via-white to-cyan-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Pilih Learning Path Anda
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Mulai perjalanan pembelajaran Anda dengan memilih path yang sesuai dengan tujuan karir Anda
          </p>
        </motion.div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {learningPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => onSelectPath(path.id)}
                className={`${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
                } border-2 rounded-2xl p-6 text-left transition-all shadow-lg hover:shadow-2xl group`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {path.title}
                </h3>

                {/* Description */}
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                  {path.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                    <span className={`text-xs ${path.progress > 0 ? 'text-[#36BFB0]' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {path.progress}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#36BFB0] to-[#2a9d91] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${path.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Meta Info */}
                <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  <span>{path.courses} kelas</span>
                  <span>{path.duration}</span>
                </div>

                {/* Hover Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#36BFB0] opacity-0 group-hover:opacity-100 transition-opacity">
                      Lihat Roadmap →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-6 text-center`}
        >
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 <strong>Tips:</strong> Pilih learning path yang sesuai dengan minat dan tujuan karir Anda. 
            Anda dapat mengubah path kapan saja.
          </p>
        </motion.div>
      </div>
    </div>
  );
}