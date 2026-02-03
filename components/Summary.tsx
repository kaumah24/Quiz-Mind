
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, RefreshCw, Home, ChevronRight } from 'lucide-react';
import Button from './Button';

interface SummaryProps {
  score: number;
  total: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const Summary: React.FC<SummaryProps> = ({ score, total, onRestart, onGoHome }) => {
  const data = [
    { name: 'Correct', value: score, color: '#10b981' },
    { name: 'Incorrect', value: total - score, color: '#ef4444' }
  ];

  const percentage = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="glass p-12 rounded-[3rem] shadow-2xl space-y-12">
        <div className="space-y-4">
          <div className="relative inline-block">
             <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
             >
               <Trophy className="w-16 h-16 text-white" />
             </motion.div>
             <div className="absolute -top-2 -right-2 bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
               Complete
             </div>
          </div>
          <h2 className="text-5xl font-black tracking-tight">Quiz Results</h2>
          <p className="text-white/60 text-xl">Fantastic effort! Here's how you performed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-4xl font-bold">{percentage}%</span>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Accuracy</p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="glass-dark p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Score</p>
                <p className="text-3xl font-bold">{score} / {total}</p>
              </div>
              <div className="h-12 w-1 bg-indigo-500 rounded-full" />
            </div>

            <div className="glass-dark p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Performance</p>
                <p className="text-3xl font-bold">
                  {percentage >= 80 ? 'Elite' : percentage >= 50 ? 'Strong' : 'Average'}
                </p>
              </div>
              <div className={`h-12 w-1 rounded-full ${percentage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} variant="secondary" className="w-full sm:w-auto py-4 px-8">
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          <Button onClick={onGoHome} variant="outline" className="w-full sm:w-auto py-4 px-8">
            <Home className="w-5 h-5" />
            Back Home
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Summary;
