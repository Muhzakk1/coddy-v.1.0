import { CheckCircle, Lock, Circle, ArrowRight } from 'lucide-react';

interface RoadmapNodeProps {
  node: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
  };
  isSelected: boolean;
  onClick: () => void;
}

export function RoadmapNode({ node, isSelected, onClick }: RoadmapNodeProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      textColor: 'text-green-700',
      shadowColor: 'shadow-green-500/20',
    },
    'in-progress': {
      icon: Circle,
      borderColor: 'border-[#36BFB0]',
      bgColor: 'bg-teal-50',
      iconColor: 'text-[#36BFB0]',
      textColor: 'text-[#36BFB0]',
      shadowColor: 'shadow-teal-500/20',
    },
    locked: {
      icon: Lock,
      borderColor: 'border-gray-300',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-400',
      textColor: 'text-gray-500',
      shadowColor: 'shadow-gray-500/10',
    },
  };

  const config = statusConfig[node.status];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      disabled={node.status === 'locked'}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all
        ${config.borderColor} ${config.bgColor}
        ${isSelected ? 'ring-4 ring-teal-200 scale-105' : ''}
        ${node.status !== 'locked' ? 'hover:scale-105 hover:shadow-lg cursor-pointer' : 'cursor-not-allowed opacity-60'}
        ${config.shadowColor} shadow-md
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-gray-900 mb-1 ${node.status === 'locked' ? 'text-gray-500' : ''}`}>
            {node.title}
          </h4>
          <p className="text-sm text-gray-600">{node.description}</p>
          {node.status === 'in-progress' && (
            <div className="mt-3 flex items-center gap-2 text-[#36BFB0] text-sm">
              <span>Lanjutkan</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
          {node.status === 'completed' && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                <CheckCircle className="w-3 h-3" />
                Selesai
              </span>
            </div>
          )}
          {node.status === 'locked' && (
            <div className="mt-3 text-xs text-gray-500">
              Selesaikan prerequisites terlebih dahulu
            </div>
          )}
        </div>
      </div>
    </button>
  );
}