import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckSquare, Plus, Clock, AlertTriangle, CheckCircle2, 
  Trash2, Filter, Layers, LayoutGrid, Calendar, ArrowRight, Sparkles 
} from 'lucide-react';

interface OctaneTaskPreviewProps {
  theme: 'dark' | 'light';
}

interface Task {
  id: string;
  title: string;
  desc: string;
  priority: 'high' | 'medium' | 'low';
  status: 'backlog' | 'progress' | 'completed';
  dueDate: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 'tk-1', title: 'Compile GLSL shader filters', desc: 'Optimize render pass variables inside the primary WebGL context.', priority: 'high', status: 'progress', dueDate: 'June 18, 2026' },
  { id: 'tk-2', title: 'Audit OAuth callback security', desc: 'Review state validation loops to prevent malicious coordinate injections.', priority: 'high', status: 'backlog', dueDate: 'June 20, 2026' },
  { id: 'tk-3', title: 'Refactor responsive grid bounds', desc: 'Convert fixed padding matrices to flexible fluid rem ratios.', priority: 'medium', status: 'completed', dueDate: 'June 14, 2026' },
  { id: 'tk-4', title: 'Structure pricing schema index', desc: 'Formulate three distinct bundle arrays with dynamic toggle triggers.', priority: 'low', status: 'backlog', dueDate: 'June 25, 2026' }
];

export default function OctaneTaskPreview({ theme }: OctaneTaskPreviewProps) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  
  // Interactive Controls State
  const [activePriorityFilter, setActivePriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isAdding, setIsAdding] = useState(false);

  // Filter computation
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => activePriorityFilter === 'all' || t.priority === activePriorityFilter);
  }, [tasks, activePriorityFilter]);

  // Compute stat ratios
  const progressPercent = useMemo(() => {
    if (tasks.length === 0) return 0;
    const finished = tasks.filter(t => t.status === 'completed').length;
    return Math.round((finished / tasks.length) * 100);
  }, [tasks]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskDesc.trim()) return;

    const fresh: Task = {
      id: `tk-${Date.now()}`,
      title: newTaskTitle,
      desc: newTaskDesc,
      priority: newTaskPriority,
      status: 'backlog',
      dueDate: 'June 28, 2026'
    };

    setTasks(prev => [fresh, ...prev]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsAdding(false);
  };

  const handleCycleStatus = (id: string, current: 'backlog' | 'progress' | 'completed') => {
    let nextStatus: 'backlog' | 'progress' | 'completed' = 'progress';
    if (current === 'progress') nextStatus = 'completed';
    else if (current === 'completed') nextStatus = 'backlog';

    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="w-full text-left relative font-sans">
      
      {/* Octane Applet Header */}
      <div className="bg-[#0b0d0c] border border-zinc-800 rounded-2xl p-4 mb-5 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/35 flex items-center justify-center text-orange-400">
            <Layers size={14} />
          </div>
          <div>
            <span className="font-extrabold text-white text-xs tracking-wider uppercase">OCTANE <span className="text-orange-400">TASK MANAGER</span></span>
            <p className="text-[8px] text-zinc-500 font-mono tracking-widest leading-none uppercase mt-0.5">High Performance Kanban Sprints</p>
          </div>
        </div>

        {/* Diagnostic speed performance scale */}
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-[9px] font-mono text-zinc-400 select-none">SPRINT METRIC STATUS: <span className="text-orange-400 font-bold">{progressPercent}% DONE</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: Controls & Creator */}
        <div className="md:col-span-4 flex flex-col gap-3.5">
          
          {/* Quick Stats overview panel */}
          <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider mb-2">Sprint Progression Meter</span>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl font-black text-white font-mono">{tasks.filter(t => t.status === 'completed').length} / {tasks.length}</span>
              <span className="text-[10px] text-zinc-500 font-mono font-bold">TASKS FINISHED</span>
            </div>
            
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden mt-1 relative">
              <div 
                className="h-full bg-orange-400 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Quick Filter Section */}
          <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-left flex flex-col gap-2">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">Priority Pipeline filter</span>
            <div className="grid grid-cols-4 gap-1.5">
              {(['all', 'high', 'medium', 'low'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setActivePriorityFilter(p)}
                  className={`py-1.5 rounded text-[9px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                    activePriorityFilter === p 
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/35 font-bold' 
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Task Addition Toggle area */}
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 py-3.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider text-orange-400 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} />
              Inject New Sprint Row
            </button>
          ) : (
            <motion.form
              onSubmit={handleCreateTask}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-left flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase font-black">TASK DETAILS</span>
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="text-[9px] text-zinc-500 hover:text-white font-mono uppercase"
                >
                  Cancel
                </button>
              </div>

              <div className="flex flex-col gap-1 text-[9px] font-mono text-zinc-400">
                <label className="uppercase">Row Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Map route matrices codes"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-black/60 border border-zinc-800 rounded py-2 px-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1 text-[9px] font-mono text-zinc-400">
                <label className="uppercase">Task description</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Provide explicit operational goals limit..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="bg-black/60 border border-zinc-800 rounded py-2 px-2.5 text-xs text-white focus:outline-none focus:border-orange-500 resize-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1 text-[9px] font-mono text-zinc-400">
                <label className="uppercase">Priority level</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="bg-black border border-zinc-800 rounded py-1.5 px-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="high">High priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="low">Low priority</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-mono text-[9px] uppercase tracking-wider font-extrabold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Incorporate Task
              </button>
            </motion.form>
          )}

        </div>

        {/* RIGHT COLUMN: Tasks Queue List */}
        <div className="md:col-span-8 flex flex-col gap-2">
          
          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-wider px-1 pb-1">
            <span>Sought Sprints Queue // ({filteredTasks.length} VISIBLE)</span>
            <span>CLICK TO ROUTE STATUS</span>
          </div>

          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            <AnimatePresence initial={false}>
              {filteredTasks.length === 0 ? (
                <div className="py-14 text-center border border-dashed border-zinc-900 rounded-xl text-zinc-500 font-mono text-[10px]">
                  No tasks satisfying selected priorities filters.
                </div>
              ) : (
                filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layoutId={task.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl flex items-start justify-between gap-4 smooth-transition"
                  >
                    <div className="flex flex-col gap-1.5 text-left flex-1 min-w-0">
                      
                      {/* Priority Badging Row */}
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${
                          task.priority === 'high' 
                            ? 'bg-red-500/10 text-red-400' 
                            : task.priority === 'medium'
                            ? 'bg-orange-500/10 text-orange-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {task.priority} Priority
                        </span>

                        <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold ${
                          task.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : task.status === 'progress'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-zinc-900 text-zinc-500'
                        }`}>
                          {task.status === 'completed' && <CheckCircle2 size={8} />}
                          {task.status === 'progress' && <Clock size={8} />}
                          {task.status === 'backlog' && <AlertTriangle size={8} />}
                          {task.status}
                        </span>
                      </div>

                      {/* Main Copy */}
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200 uppercase leading-snug truncate">{task.title}</h4>
                        <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">{task.desc}</p>
                      </div>

                      {/* Due labels */}
                      <span className="text-[8px] font-mono text-zinc-650 uppercase">TARGET COMPLETION: {task.dueDate}</span>
                    </div>

                    {/* Interactive Triggers column */}
                    <div className="flex flex-col gap-1.5 items-end justify-center shrink-0">
                      <button
                        onClick={() => handleCycleStatus(task.id, task.status)}
                        className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300 hover:text-white rounded-lg hover:border-orange-500 hover:bg-neutral-805 uppercase transition-all cursor-pointer flex items-center gap-1 font-bold"
                      >
                        CYCLE STATE
                        <ArrowRight size={10} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}
