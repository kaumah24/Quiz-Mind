import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  BrainCircuit,
  User,
  Clock,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Quiz, QuizState } from './types';
import { CATEGORIES as PREDEFINED_CATEGORIES, getIcon } from './constants';
import { generateQuiz } from './services/geminiService';
import QuizCard from './components/QuizCard';
import Summary from './components/Summary';
import AboutDeveloper from './components/AboutDeveloper';
import Button from './components/Button';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>(QuizState.IDLE);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startQuiz = async (topic: string) => {
    try {
      setState(QuizState.LOADING);
      setError(null);
      const generatedQuiz = await generateQuiz(topic, questionCount);
      setQuiz(generatedQuiz);
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
      setState(QuizState.ACTIVE);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Check your connection/API key and try again.");
      setState(QuizState.IDLE);
    }
  };

  const handleAnswer = (index: number) => {
    if (!quiz) return;
    setSelectedAnswer(index);
    const correct = index === quiz.questions[currentIdx].correctAnswerIndex;
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentIdx < quiz.questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setState(QuizState.FINISHED);
      }
    }, 2500);
  };

  const resetToHome = () => {
    setState(QuizState.IDLE);
    setQuiz(null);
    setCustomTopic('');
    setError(null);
  };

  const retryQuiz = () => {
    if (quiz) {
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
      setState(QuizState.ACTIVE);
    }
  };

  const formattedDate = currentTime.toLocaleDateString(undefined, { 
    weekday: 'short', month: 'short', day: 'numeric' 
  });
  const formattedTime = currentTime.toLocaleTimeString(undefined, { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
  });

  return (
    <div className="min-h-screen relative flex flex-col items-center p-4 md:p-8">
      {/* Dynamic Background */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />

      {/* Modern Header */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-16 gap-6 z-50">
        <div 
          onClick={resetToHome} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-2.5 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-all duration-300">
            <BrainCircuit className="w-9 h-9 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Quiz<span className="text-indigo-400">Mind</span></h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2 tabular-nums">
              <Clock className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>{formattedTime}</span>
            </div>
          </div>
          
          {state === QuizState.IDLE && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setState(QuizState.ABOUT)}
              className="glass p-3.5 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all text-sm font-bold border border-white/5"
            >
              <User className="w-5 h-5 text-indigo-400" />
              <span className="hidden sm:inline">Profile</span>
            </motion.button>
          )}
        </div>
      </header>

      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-10 max-w-7xl">
        <AnimatePresence mode="wait">
          {state === QuizState.IDLE && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full space-y-20"
            >
              <div className="text-center space-y-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
                >
                  <Sparkles className="w-4 h-4" />
                  Infinite Intelligence
                </motion.div>
                <h2 className="text-7xl md:text-9xl font-black tracking-tight text-white leading-[0.85]">
                  Peak<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Curiosity.</span>
                </h2>
                <p className="text-xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed">
                  The standard for personalized AI challenges. Enter any topic or pick a pre-curated path to test your knowledge.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Custom Topic Selection */}
                <div className="lg:col-span-7 glass p-10 rounded-[3rem] flex flex-col justify-between space-y-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black">Custom Quest</h3>
                      <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Configure your challenge parameters</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-black text-white/30 uppercase tracking-widest ml-1">Length Selection</label>
                      <div className="flex gap-3 p-2 glass-dark rounded-3xl border border-white/5">
                        {[5, 15].map((count) => (
                          <button
                            key={count}
                            onClick={() => setQuestionCount(count)}
                            className={`flex-1 py-4 rounded-2xl font-black transition-all duration-500 ${
                              questionCount === count 
                                ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] scale-[1.02]' 
                                : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                            }`}
                          >
                            {count === 5 ? 'SHORT (5)' : 'LONG (15)'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col sm:flex-row gap-4 z-10">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="Enter a topic (e.g., Space Exploration)..."
                      className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-xl font-bold placeholder:text-white/20"
                      onKeyDown={(e) => e.key === 'Enter' && customTopic && startQuiz(customTopic)}
                    />
                    <Button 
                      variant="secondary" 
                      className="py-5 px-10 bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl font-black text-lg group/btn"
                      disabled={!customTopic}
                      onClick={() => startQuiz(customTopic)}
                    >
                      BEGIN
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-5">
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => startQuiz(cat.name)}
                      className="glass p-8 rounded-[2.5rem] flex flex-col items-start gap-6 text-left group hover:border-indigo-500/40 transition-all border border-white/5 relative overflow-hidden"
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-2xl group-hover:rotate-6 transition-transform`}>
                        {getIcon(cat.icon, "w-8 h-8")}
                      </div>
                      <div>
                        <h4 className="font-black text-2xl leading-tight">{cat.name}</h4>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mt-2">Instant Start</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {error && <p className="text-rose-500 text-center font-black bg-rose-500/10 py-5 px-10 rounded-full max-w-xl mx-auto border border-rose-500/20">{error}</p>}
            </motion.div>
          )}

          {state === QuizState.LOADING && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-16">
              <div className="relative inline-block">
                <div className="w-48 h-48 border-[8px] border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                <BrainCircuit className="w-20 h-20 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-6">
                <h2 className="text-5xl font-black animate-pulse">Forging Your {questionCount} Questions</h2>
                <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-xs">AI is drafting a unique sequence of challenges...</p>
              </div>
            </motion.div>
          )}

          {state === QuizState.ACTIVE && quiz && (
            <div key="active" className="w-full">
              <QuizCard
                question={quiz.questions[currentIdx]}
                questionNumber={currentIdx + 1}
                totalQuestions={quiz.questions.length}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                isCorrect={selectedAnswer !== null ? selectedAnswer === quiz.questions[currentIdx].correctAnswerIndex : null}
              />
              <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass px-12 py-6 rounded-full flex items-center gap-12 shadow-2xl z-50 border border-indigo-500/30">
                <div className="flex flex-col items-center">
                  <span className="text-white/30 font-black text-[9px] uppercase tracking-[0.3em] mb-1">Current Subject</span>
                  <span className="font-black text-indigo-400 truncate max-w-[180px] text-lg">{quiz.title}</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-white/30 font-black text-[9px] uppercase tracking-[0.3em] mb-1">Points</span>
                  <span className="font-black text-3xl tabular-nums">{score}</span>
                </div>
              </div>
            </div>
          )}

          {state === QuizState.FINISHED && (
            <Summary 
              key="summary"
              score={score}
              total={quiz?.questions.length || 0}
              onRestart={retryQuiz}
              onGoHome={resetToHome}
            />
          )}

          {state === QuizState.ABOUT && <AboutDeveloper key="about" onBack={resetToHome} />}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-12 border-t border-white/5 w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <div className="text-[10px] font-black uppercase tracking-[0.5em]">QuizMind • Premium Knowledge Platform</div>
        <div className="text-[10px] font-bold tracking-widest">{formattedDate} • {formattedTime}</div>
      </footer>
    </div>
  );
};

export default App;