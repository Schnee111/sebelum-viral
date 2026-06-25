import { motion } from 'framer-motion';
import { getEdgeColor, getEdgeLabel } from '../../engines/boardEngine';
import type { RelationKind } from '../../types';

interface ConnectionEdgeProps {
  kind: RelationKind;
  label?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function ConnectionEdge({ kind, label, x1, y1, x2, y2 }: ConnectionEdgeProps) {
  const color = getEdgeColor(kind);
  const displayLabel = label ?? getEdgeLabel(kind);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Add a slight curve (bezier) for a cleaner UI than straight rigid lines
  const path = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 20} ${x2} ${y2}`;

  return (
    <g>
      {/* Background glow for visibility */}
      <motion.path
        d={path}
        fill="transparent"
        stroke={color}
        strokeWidth={6}
        opacity={0.15}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7 }}
      />
      {/* Main Line */}
      <motion.path
        d={path}
        fill="transparent"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={kind === 'contradiction' ? '6,6' : 'none'}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {displayLabel && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Label Background Pill */}
          <rect
            x={midX - 45}
            y={midY - 26}
            width={90}
            height={20}
            rx={10}
            fill="#0F172A"
            stroke={color}
            strokeWidth={1}
            opacity={0.9}
          />
          <text
            x={midX}
            y={midY - 12}
            textAnchor="middle"
            fill={color}
            fontSize={10}
            fontWeight="600"
            letterSpacing={0.5}
            className="select-none"
          >
            {displayLabel.toUpperCase()}
          </text>
        </motion.g>
      )}
    </g>
  );
}
