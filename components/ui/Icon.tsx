import {
    ArrowRight,
    ChevronRight,
    Clock,
    Heart,
    House,
    LayoutGrid,
    List,
    Menu,
    Moon,
    Play,
    Search,
    Settings,
    ShoppingBag,
    Star,
    Sun,
    User,
} from 'lucide-react-native';
import React from 'react';

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

const STROKE = 1.75;

export const Icon: React.FC<Props> = ({ name, size = 22, color = '#0F1626', filled }) => {
  const outline = { size, color, strokeWidth: STROKE, fill: 'transparent' as const };
  const filledShape = {
    size,
    color,
    strokeWidth: STROKE,
    fill: filled ? color : ('transparent' as const),
  };

  switch (name) {
    case 'home':
      return <House {...filledShape} />;
    case 'heart':
      return <Heart {...filledShape} />;
    case 'list':
      return <List {...outline} />;
    case 'bag':
      return <ShoppingBag {...outline} />;
    case 'user':
      return <User {...outline} />;
    case 'search':
      return <Search {...outline} />;
    case 'grid':
      return <LayoutGrid {...outline} />;
    case 'settings':
      return <Settings {...outline} />;
    case 'arrowRight':
      return <ArrowRight {...outline} />;
    case 'arrowRightSmall':
      return <ChevronRight {...outline} strokeWidth={2} />;
    case 'play':
      return <Play size={size} color={color} strokeWidth={STROKE} fill={color} />;
    case 'clock':
      return <Clock {...outline} />;
    case 'star':
      return <Star {...filledShape} />;
    case 'menu':
      return <Menu {...outline} />;
    case 'sun':
      return <Sun {...outline} />;
    case 'moon':
      return <Moon {...filledShape} />;
    default:
      return null;
  }
};
