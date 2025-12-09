import { motion } from 'motion/react';
import { CheckCircle, Bell, TrendingUp } from 'lucide-react';

interface ProgressNotificationProps {
  type: 'roadmap-update' | 'milestone' | 'reminder';
  message: string;
}

export function ProgressNotification({ type, message }: ProgressNotificationProps) {
  const icons = {
    'roadmap-update': TrendingUp,
    milestone: CheckCircle,
    reminder: Bell,
  };

  const colors = {
    'roadmap-update': 'from-[#36BFB0] to-cyan-500',
    milestone: 'from-green-500 to-emerald-500',
    reminder: 'from-orange-500 to-amber-500',
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="ml-14"
    >
      <div className={`bg-gradient-to-r ${colors[type]} rounded-xl p-4 shadow-lg text-white`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}