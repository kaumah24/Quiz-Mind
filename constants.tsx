
import React from 'react';
import { 
  Code2, 
  FlaskConical, 
  History, 
  Globe2, 
  Cpu, 
  Music, 
  Gamepad2, 
  Palmtree 
} from 'lucide-react';
import { QuizCategory } from './types';

export const CATEGORIES: QuizCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'Code2',
    color: 'from-blue-500 to-cyan-400',
    description: 'Test your coding knowledge across various languages.'
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'FlaskConical',
    color: 'from-green-500 to-emerald-400',
    description: 'Explore the mysteries of the universe and biology.'
  },
  {
    id: 'history',
    name: 'History',
    icon: 'History',
    color: 'from-amber-500 to-orange-400',
    description: 'Travel back in time to pivotal human moments.'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: 'Cpu',
    color: 'from-purple-500 to-indigo-400',
    description: 'Latest gadgets, innovations, and digital trends.'
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: 'Globe2',
    color: 'from-teal-500 to-green-400',
    description: 'Discover countries, cultures, and landmarks.'
  },
  {
    id: 'entertainment',
    name: 'Pop Culture',
    icon: 'Gamepad2',
    color: 'from-pink-500 to-rose-400',
    description: 'Movies, games, and celebrity trivia.'
  }
];

export const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, any> = {
    Code2, FlaskConical, History, Globe2, Cpu, Music, Gamepad2, Palmtree
  };
  const IconComp = icons[iconName] || Globe2;
  return <IconComp className={className} />;
};
