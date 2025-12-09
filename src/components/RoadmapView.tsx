import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Lock, Circle, Trophy, Target } from 'lucide-react';
import { RoadmapNode } from './RoadmapNode';
import { LearningPathSelection } from './LearningPathSelection';

interface RoadmapViewProps {
  onNavigateToChat: () => void;
  isDarkMode: boolean;
}

interface SkillNode {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  level: number;
  prerequisites: string[];
}

export function RoadmapView({ onNavigateToChat, isDarkMode }: RoadmapViewProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // If no path selected, show path selection
  if (!selectedPath) {
    return <LearningPathSelection onSelectPath={setSelectedPath} isDarkMode={isDarkMode} />;
  }

  const skillNodes: SkillNode[] = [
    {
      id: '1',
      title: 'HTML & CSS Basics',
      description: 'Dasar-dasar HTML dan CSS untuk membuat halaman web',
      status: 'completed',
      level: 0,
      prerequisites: [],
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      description: 'Pelajari dasar-dasar JavaScript',
      status: 'in-progress',
      level: 0,
      prerequisites: [],
    },
    {
      id: '3',
      title: 'Responsive Design',
      description: 'Membuat website yang responsif',
      status: 'completed',
      level: 1,
      prerequisites: ['1'],
    },
    {
      id: '4',
      title: 'CSS Frameworks',
      description: 'Tailwind CSS & Bootstrap',
      status: 'locked',
      level: 1,
      prerequisites: ['1', '3'],
    },
    {
      id: '5',
      title: 'JavaScript ES6+',
      description: 'Modern JavaScript features',
      status: 'locked',
      level: 1,
      prerequisites: ['2'],
    },
    {
      id: '6',
      title: 'DOM Manipulation',
      description: 'Manipulasi elemen HTML dengan JavaScript',
      status: 'locked',
      level: 1,
      prerequisites: ['2'],
    },
    {
      id: '7',
      title: 'React Fundamentals',
      description: 'Membangun aplikasi dengan React',
      status: 'locked',
      level: 2,
      prerequisites: ['5', '6'],
    },
    {
      id: '8',
      title: 'State Management',
      description: 'Redux & Context API',
      status: 'locked',
      level: 2,
      prerequisites: ['7'],
    },
    {
      id: '9',
      title: 'API Integration',
      description: 'Bekerja dengan REST API',
      status: 'locked',
      level: 2,
      prerequisites: ['5'],
    },
    {
      id: '10',
      title: 'Full Stack Project',
      description: 'Bangun aplikasi web lengkap',
      status: 'locked',
      level: 3,
      prerequisites: ['7', '8', '9'],
    },
  ];

  const levels = [
    { name: 'Foundation', nodes: skillNodes.filter((n) => n.level === 0) },
    { name: 'Intermediate', nodes: skillNodes.filter((n) => n.level === 1) },
    { name: 'Advanced', nodes: skillNodes.filter((n) => n.level === 2) },
    { name: 'Expert', nodes: skillNodes.filter((n) => n.level === 3) },
  ];

  const totalNodes = skillNodes.length;
  const completedNodes = skillNodes.filter((n) => n.status === 'completed').length;
  const progressPercentage = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 shadow-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onNavigateToChat}
              className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Chat</span>
            </button>
            <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>|</span>
            <button
              onClick={() => setSelectedPath(null)}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              Ganti Learning Path
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Learning Roadmap Anda</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedPath === 'web-development' && 'Web Development Path'}
                {selectedPath === 'mobile-development' && 'Mobile Development Path'}
                {selectedPath === 'data-science' && 'Data Science Path'}
                {selectedPath === 'machine-learning' && 'Machine Learning Path'}
                {selectedPath === 'fullstack' && 'Full Stack Development Path'}
                {selectedPath === 'ui-ux' && 'UI/UX Design Path'}
                {selectedPath === 'backend' && 'Backend Development Path'}
                {selectedPath === 'cyber-security' && 'Cyber Security Path'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress Total</p>
                <p className="text-[#36BFB0]">{progressPercentage}%</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#36BFB0] flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
              <motion.div
                className="bg-[#36BFB0] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className={`flex justify-between mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{completedNodes} dari {totalNodes} skill diselesaikan</span>
              <span>Target: Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Canvas */}
      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {levels.map((level, levelIndex) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: levelIndex * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#36BFB0] flex items-center justify-center text-white shadow-lg">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>{level.name}</h3>
                  <div className={`flex-1 h-px bg-gradient-to-r ${isDarkMode ? 'from-gray-700' : 'from-gray-300'} to-transparent`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                  {level.nodes.map((node, nodeIndex) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: levelIndex * 0.2 + nodeIndex * 0.1 }}
                    >
                      <RoadmapNode
                        node={node}
                        isSelected={selectedNode === node.id}
                        onClick={() => setSelectedNode(node.id)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Connection lines visual hint */}
                {levelIndex < levels.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-12 bg-gradient-to-b from-teal-400 to-cyan-400" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`mt-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-md border`}
          >
            <h4 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Status Legend</h4>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-[#36BFB0]" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sedang Dipelajari</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Terkunci</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}