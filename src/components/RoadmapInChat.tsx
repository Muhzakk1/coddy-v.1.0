import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RoadmapNodeCustom } from "./RoadmapNodeCustom";

const nodeTypes = {
  custom: RoadmapNodeCustom,
};

interface RoadmapInChatProps {
  isDarkMode: boolean;
}

export function RoadmapInChat({ isDarkMode }: RoadmapInChatProps) {
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "custom",
      position: { x: 250, y: 0 },
      data: {
        label: "HTML & CSS Basics",
        description: "Dasar-dasar HTML dan CSS",
        status: "completed",
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 500, y: 0 },
      data: {
        label: "JavaScript Fundamentals",
        description: "Dasar-dasar JavaScript",
        status: "in-progress",
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 100, y: 150 },
      data: {
        label: "Responsive Design",
        description: "Website responsif",
        status: "completed",
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 300, y: 150 },
      data: {
        label: "CSS Frameworks",
        description: "Tailwind & Bootstrap",
        status: "locked",
      },
    },
    {
      id: "5",
      type: "custom",
      position: { x: 500, y: 150 },
      data: {
        label: "JavaScript ES6+",
        description: "Modern JavaScript",
        status: "locked",
      },
    },
    {
      id: "6",
      type: "custom",
      position: { x: 700, y: 150 },
      data: {
        label: "DOM Manipulation",
        description: "Manipulasi HTML",
        status: "locked",
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 400, y: 300 },
      data: {
        label: "React Fundamentals",
        description: "Membangun app dengan React",
        status: "locked",
      },
    },
    {
      id: "8",
      type: "custom",
      position: { x: 250, y: 450 },
      data: {
        label: "State Management",
        description: "Redux & Context API",
        status: "locked",
      },
    },
    {
      id: "9",
      type: "custom",
      position: { x: 550, y: 450 },
      data: {
        label: "API Integration",
        description: "Bekerja dengan REST API",
        status: "locked",
      },
    },
    {
      id: "10",
      type: "custom",
      position: { x: 400, y: 600 },
      data: {
        label: "Full Stack Project",
        description: "Aplikasi web lengkap",
        status: "locked",
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "e1-3",
      source: "1",
      target: "3",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981", strokeWidth: 2 },
    },
    {
      id: "e1-4",
      source: "1",
      target: "4",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e2-5",
      source: "2",
      target: "5",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#36BFB0", strokeWidth: 2 },
    },
    {
      id: "e2-6",
      source: "2",
      target: "6",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#36BFB0", strokeWidth: 2 },
    },
    {
      id: "e5-7",
      source: "5",
      target: "7",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e6-7",
      source: "6",
      target: "7",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e7-8",
      source: "7",
      target: "8",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e5-9",
      source: "5",
      target: "9",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e7-9",
      source: "7",
      target: "9",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e8-10",
      source: "8",
      target: "10",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
    {
      id: "e9-10",
      source: "9",
      target: "10",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      className={`w-full h-[600px] ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-xl border-2 shadow-lg overflow-hidden`}
    >
      <div className="bg-[#36BFB0] px-4 py-3 text-white">
        <h3 className="flex items-center gap-2">🗺️ Learning Roadmap Anda</h3>
        <p className="text-sm text-teal-100">Klik node untuk melihat detail</p>
      </div>
      <div className="w-full" style={{ height: "calc(600px - 76px)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnScroll={true}
          zoomOnScroll={true}
          preventScrolling={false}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="#e5e7eb"
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
