import { Handle, Position } from '@xyflow/react';
import { CheckCircle, Lock, Circle } from 'lucide-react';

interface RoadmapNodeCustomProps {
  data: {
    label: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
  };
}

export function RoadmapNodeCustom({ data }: RoadmapNodeCustomProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      shadowColor: 'shadow-green-500/30',
    },
    'in-progress': {
      icon: Circle,
      borderColor: 'border-[#36BFB0]',
      bgColor: 'bg-teal-50',
      iconColor: 'text-[#36BFB0]',
      shadowColor: 'shadow-teal-500/30',
    },
    locked: {
      icon: Lock,
      borderColor: 'border-gray-300',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-400',
      shadowColor: 'shadow-gray-500/20',
    },
  };

  const config = statusConfig[data.status];
  const Icon = config.icon;

  return (
    <div
      className={`
        px-4 py-3 rounded-xl border-2 shadow-lg min-w-[200px] max-w-[220px]
        ${config.borderColor} ${config.bgColor} ${config.shadowColor}
        transition-all hover:scale-105
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />

      <div className="flex items-start gap-2">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 mb-1">{data.label}</p>
          <p className="text-xs text-gray-600">{data.description}</p>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />
    </div>
  );
}