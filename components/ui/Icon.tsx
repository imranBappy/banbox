import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polygon } from 'react-native-svg';

export type IconName =
  | 'home'
  | 'heart'
  | 'list'
  | 'bag'
  | 'user'
  | 'search'
  | 'grid'
  | 'settings'
  | 'arrowRight'
  | 'arrowRightSmall'
  | 'play'
  | 'clock'
  | 'star'
  | 'menu'
  | 'sun'
  | 'moon';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
}

export const Icon: React.FC<Props> = ({ name, size = 22, color = '#0F1626', filled }) => {
  switch (name) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
          <Path
            d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'heart':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
          <Path
            d="M12 20s-7-4.35-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.65-9 9-9 9z"
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'list':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x={4} y={5} width={16} height={3} rx={1} stroke={color} strokeWidth={1.8} />
          <Rect x={4} y={11} width={16} height={3} rx={1} stroke={color} strokeWidth={1.8} />
          <Rect x={4} y={17} width={10} height={2.5} rx={1} stroke={color} strokeWidth={1.8} />
        </Svg>
      );
    case 'bag':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 8h14l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8z"
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          <Path d="M9 8V6a3 3 0 016 0v2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </Svg>
      );
    case 'user':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
          <Path
            d="M4 21c0-4 4-6 8-6s8 2 8 6"
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'search':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
          <Line
            x1={16}
            y1={16}
            x2={21}
            y2={21}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'grid':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x={4} y={4} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.8} />
          <Rect x={13} y={4} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.8} />
          <Rect x={4} y={13} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.8} />
          <Rect x={13} y={13} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.8} />
        </Svg>
      );
    case 'settings':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
          <Path
            d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 010-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 012.83-2.83l.06.06a1.7 1.7 0 001.87.34h.01a1.7 1.7 0 001-1.55V3a2 2 0 014 0v.09a1.7 1.7 0 001 1.55h.01a1.7 1.7 0 001.87-.34l.06-.06a2 2 0 012.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.01a1.7 1.7 0 001.55 1H21a2 2 0 010 4h-.09a1.7 1.7 0 00-1.55 1z"
            stroke={color}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'menu':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Line
            x1={5}
            y1={7}
            x2={19}
            y2={7}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Line
            x1={5}
            y1={12}
            x2={19}
            y2={12}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Line
            x1={5}
            y1={17}
            x2={15}
            y2={17}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'arrowRight':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12h14M13 6l6 6-6 6"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'arrowRightSmall':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M9 6l6 6-6 6"
            stroke={color}
            strokeWidth={2.2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'play':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <Polygon points="8,5 19,12 8,19" fill={color} />
        </Svg>
      );
    case 'clock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
          <Path
            d="M12 7v5l3 2"
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'star':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
          <Polygon
            points="12,3 14.9,9.3 22,10 16.5,14.6 18.2,21 12,17.6 5.8,21 7.5,14.6 2,10 9.1,9.3"
            stroke={color}
            strokeWidth={1.6}
            strokeLinejoin="round"
            fill={filled ? color : 'none'}
          />
        </Svg>
      );
    case 'sun':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.8} />
          <Line x1={12} y1={2} x2={12} y2={5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={12} y1={19} x2={12} y2={22} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={2} y1={12} x2={5} y2={12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={19} y1={12} x2={22} y2={12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={4.5} y1={4.5} x2={6.6} y2={6.6} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={17.4} y1={17.4} x2={19.5} y2={19.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={4.5} y1={19.5} x2={6.6} y2={17.4} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={17.4} y1={6.6} x2={19.5} y2={4.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </Svg>
      );
    case 'moon':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
            fill={filled ? color : 'none'}
          />
        </Svg>
      );
    default:
      return null;
  }
};
