
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  isCorrect
}) => {
  // Fix: Move isAnswered to the component scope so it's accessible globally within the component
  const isAnswered = selectedAnswer !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8 space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-sm font-medium text-white/50 uppercase tracking-widest">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-bold text-indigo-400">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] shadow-2xl space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isOptionCorrect = index === question.correctAnswerIndex;
            
            let borderColor = "border-white/10";
            let bgColor = "bg-white/5";
            let textColor = "text-white/80";

            if (isAnswered) {
              if (isOptionCorrect) {
                borderColor = "border-emerald-500/50";
                bgColor = "bg-emerald-500/10";
                textColor = "text-emerald-400";
              } else if (isSelected && !isCorrect) {
                borderColor = "border-rose-500/50";
                bgColor = "bg-rose-500/10";
                textColor = "text-rose-400";
              } else {
                textColor = "text-white/40";
              }
            } else {
              borderColor = "hover:border-white/30 hover:bg-white/10";
            }

            return (
              <motion.button
                key={index}
                whileHover={!isAnswered ? { scale: 1.01, x: 5 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => !isAnswered && onAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between group ${borderColor} ${bgColor} ${textColor}`}
              >
                <span className="text-lg font-medium">{option}</span>
                {isAnswered && isOptionCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-500" />
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-6 border-t border-white/10"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Explanation</h4>
              <p className="text-white/70 leading-relaxed italic">
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizCard;
