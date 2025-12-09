import { motion } from 'motion/react';
import { ArrowRight, Clock, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    progress?: number;
    level: string;
  };
  isDarkMode: boolean;
}

export function CourseCard({ course, isDarkMode }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} rounded-xl shadow-md border overflow-hidden hover:shadow-xl transition-all`}
    >
      <div className="flex">
        <div className="w-32 h-32 flex-shrink-0 bg-gray-100">
          <ImageWithFallback
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>{course.title}</h3>
            <span className={`px-2 py-1 ${isDarkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-[#36BFB0]'} rounded text-xs`}>
              {course.level}
            </span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{course.description}</p>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>~40 jam</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>Sertifikat</span>
              </div>
            </div>
            <button className="flex items-center gap-1 px-4 py-2 bg-[#36BFB0] text-white rounded-lg hover:bg-[#2da89a] transition-all text-sm shadow-md">
              Mulai
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {course.progress !== undefined && course.progress > 0 && (
        <div className="px-4 pb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#36BFB0] h-2 rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{course.progress}% selesai</p>
        </div>
      )}
    </motion.div>
  );
}