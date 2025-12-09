import { motion } from 'motion/react';
import { Trophy, Star, Zap, Target, Award, Sparkles } from 'lucide-react';

interface AchievementNotificationProps {
  achievement: {
    title: string;
    description: string;
    type: 'first-course' | 'streak' | 'level-up' | 'mastery' | 'milestone';
    reward?: string;
  };
}

export function AchievementNotification({ achievement }: AchievementNotificationProps) {
  const achievementConfig = {
    'first-course': {
      icon: Star,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      glowColor: 'shadow-yellow-500/50',
    },
    'streak': {
      icon: Zap,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 to-pink-50',
      glowColor: 'shadow-orange-500/50',
    },
    'level-up': {
      icon: Target,
      gradient: 'from-[#36BFB0] via-cyan-500 to-teal-500',
      bgGradient: 'from-teal-50 to-cyan-50',
      glowColor: 'shadow-teal-500/50',
    },
    'mastery': {
      icon: Award,
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      bgGradient: 'from-purple-50 to-pink-50',
      glowColor: 'shadow-purple-500/50',
    },
    'milestone': {
      icon: Trophy,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50',
      glowColor: 'shadow-green-500/50',
    },
  };

  const config = achievementConfig[achievement.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="ml-14"
    >
      <div className={`relative bg-gradient-to-br ${config.bgGradient} rounded-2xl p-6 shadow-2xl ${config.glowColor} border-2 border-white overflow-hidden`}>
        {/* Animated background sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
              }}
              animate={{
                y: [null, '-100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        <div className="relative flex items-start gap-4">
          {/* Icon with animation */}
          <motion.div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
              repeatDelay: 0.2,
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 uppercase tracking-wide">Achievement Unlocked!</span>
            </div>
            <h4 className="text-gray-900 mb-1">{achievement.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            
            {achievement.reward && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${config.gradient} rounded-lg text-white text-sm shadow-lg`}
              >
                <Trophy className="w-4 h-4" />
                <span>Reward: {achievement.reward}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Celebration confetti effect */}
        <motion.div
          className="absolute top-0 right-0 text-6xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          🎉
        </motion.div>
      </div>
    </motion.div>
  );
}