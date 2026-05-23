"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  ArrowLeft, Database, Plus, Trash2, CheckCircle2, Circle, 
  Clock, ArrowRight, ArrowLeft as ArrowLeftIcon, Code2, 
  Phone, HardDrive, RefreshCcw, Info, Flag, Server, 
  PackageSearch, Terminal, Play, ArrowDownWideNarrow
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Custom SVGs for Standard Footer ---
const CustomGithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /></svg>
)
const CustomInstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)

// --- Types & Realistic Sample Data ---
type TaskStatus = "todo" | "in-progress" | "completed"
type Priority = "low" | "medium" | "high"

interface Task {
  id: string; title: string; status: TaskStatus; createdAt: number; priority: Priority; timeSpentSeconds: number;
}

const initialTasks: Task[] = [
  { id: "1", title: "Finalize MyFavefit.ng product descriptions and launch video exports", status: "completed", createdAt: Date.now() - 100000, priority: "high", timeSpentSeconds: 4500 },
  { id: "2", title: "Review Statistics (Binomial, Poisson, & Normal Distributions)", status: "in-progress", createdAt: Date.now() - 50000, priority: "high", timeSpentSeconds: 342 },
  { id: "3", title: "Optimize Python dictionary practicals for the backend API", status: "in-progress", createdAt: Date.now() - 20000, priority: "medium", timeSpentSeconds: 1210 },
  { id: "4", title: "Request Alibaba wholesale quotations for Clinical Clogs", status: "todo", createdAt: Date.now(), priority: "low", timeSpentSeconds: 0 },
  { id: "5", title: "Configure Render monitoring & Better Stack webhooks", status: "todo", createdAt: Date.now() + 1000, priority: "high", timeSpentSeconds: 0 },
]

const inventoryData = [
  { sku: "SCR-NVY-M", product: "Medical Scrubs (Navy Blue)", stock: 145, status: "In Stock", price: "$45.00" },
  { sku: "VIT-SET-BLK", product: "The Vital Set (Black)", stock: 12, status: "Low Stock", price: "$85.00" },
  { sku: "CLG-WHT-10", product: "Clinical Clogs (White)", stock: 89, status: "In Stock", price: "$65.00" },
  { sku: "ACC-MHA-BRC", product: "Mental Health Awareness Brooch", stock: 0, status: "Out of Stock", price: "$12.00" },
  { sku: "ACC-JCE-SLV", product: "Jesus Cross Charm Earring", stock: 45, status: "In Stock", price: "$18.00" },
]

export default function ProjectThree() {
  const [activeTab, setActiveTab] = useState<"tasks" | "inventory" | "sql">("tasks")
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newPriority, setNewPriority] = useState<Priority>("medium")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("priority")
  const [isMounted, setIsMounted] = useState(false)
  const [storageUsed, setStorageUsed] = useState("0 B")

  const [query, setQuery] = useState("SELECT sku, product, stock FROM inventory\nWHERE status = 'Low Stock'\nORDER BY stock ASC;")
  const [queryRunning, setQueryRunning] = useState(false)
  const [queryResult, setQueryResult] = useState<string | null>(null)

  // Hydrate data from LocalStorage
  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("avida_ops_db")
    if (saved) {
      try { setTasks(JSON.parse(saved)) } 
      catch (e) { setTasks(initialTasks) }
    } else {
      setTasks(initialTasks)
    }
  }, [])

  // Save to LocalStorage ONLY when tasks array changes structurally
  useEffect(() => {
    if (!isMounted) return
    const dataString = JSON.stringify(tasks)
    localStorage.setItem("avida_ops_db", dataString)
    const bytes = new Blob([dataString]).size
    if (bytes < 1024) setStorageUsed(`${bytes} B`)
    else setStorageUsed(`${(bytes / 1024).toFixed(2)} KB`)
  }, [tasks, isMounted])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTaskTitle.trim(), status: "todo", createdAt: Date.now(), priority: newPriority, timeSpentSeconds: 0
    }
    setTasks([newTask, ...tasks])
    setNewTaskTitle("")
  }

  const moveTask = (id: string, newStatus: TaskStatus, additionalTime: number = 0) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus, timeSpentSeconds: t.timeSpentSeconds + additionalTime } : t))
  }

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id))
  
  const wipeDatabase = () => {
    if (confirm("Wipe the local operations database? This cannot be undone.")) {
      setTasks([])
      localStorage.removeItem("avida_ops_db")
    }
  }

  const runQuery = () => {
    setQueryRunning(true)
    setQueryResult(null)
    setTimeout(() => {
      setQueryRunning(false)
      setQueryResult(`Execution successful. \nParsed 5 rows in 14ms.\nTarget database: avida_production_main.`)
    }, 1500)
  }

  // --- Highly Optimized Sorting (Zero Lag) ---
  const sortedTasks = useMemo(() => {
    const priorityWeight = { high: 3, medium: 2, low: 1 }
    return [...tasks].sort((a, b) => {
      if (sortBy === "newest") return b.createdAt - a.createdAt
      if (sortBy === "oldest") return a.createdAt - b.createdAt
      if (sortBy === "priority") {
        const weightDiff = priorityWeight[b.priority] - priorityWeight[a.priority]
        if (weightDiff === 0) return b.createdAt - a.createdAt
        return weightDiff
      }
      return 0
    })
  }, [tasks, sortBy])

  if (!isMounted) return null

  const todoTasks = sortedTasks.filter(t => t.status === "todo")
  const progressTasks = sortedTasks.filter(t => t.status === "in-progress")
  const completedTasks = sortedTasks.filter(t => t.status === "completed")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 flex flex-col overflow-x-hidden">
      <main className="flex-grow p-4 md:p-6 lg:p-10">
        <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
          
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <Server className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Operations Hub</h1>
                </div>
                <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
                  Enterprise backend simulation. Features an automated task matrix, inventory data grids, and an interactive SQL query console.
                </p>
              </div>
            </div>

            {/* Storage Meter & Wipe Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center justify-between w-full sm:w-auto border border-slate-800 bg-slate-900 px-4 h-11 rounded-md shrink-0">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-400">Memory Cache:</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{storageUsed}</span>
                </div>
              </div>
              
              <button 
                onClick={wipeDatabase}
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-md border border-red-900/50 bg-red-500/10 text-sm font-bold text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-colors shrink-0"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Wipe Cache
              </button>
            </div>
          </header>

          {/* Module Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-800 gap-6 pb-px scrollbar-hide touch-pan-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button 
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === "tasks" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
            >
              <Database className="w-4 h-4" /> Task Matrix
            </button>
            <button 
              onClick={() => setActiveTab("inventory")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === "inventory" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
            >
              <PackageSearch className="w-4 h-4" /> Inventory Database
            </button>
            <button 
              onClick={() => setActiveTab("sql")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === "sql" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
            >
              <Terminal className="w-4 h-4" /> SQL Console
            </button>
          </div>

          <div className="min-h-[550px] lg:min-h-[600px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: TASK MATRIX */}
              {activeTab === "tasks" && (
                <motion.div 
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Controls Row */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Add Form */}
                    <form onSubmit={addTask} className="flex-grow bg-slate-900 border border-slate-800 p-2 sm:pl-4 rounded-xl shadow-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <div className="flex items-center w-full sm:w-auto flex-grow gap-2">
                        <Plus className="w-5 h-5 text-emerald-500 shrink-0 hidden sm:block" />
                        <input 
                          type="text" placeholder="Inject new task into database..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="flex-grow w-full bg-slate-950 sm:bg-transparent border border-slate-800 sm:border-none rounded-lg sm:rounded-none px-3 sm:px-0 text-white text-sm focus:outline-none focus:ring-0 placeholder:text-slate-500 h-12 sm:h-10"
                        />
                      </div>
                      <div className="flex items-center w-full sm:w-auto gap-2 sm:gap-3">
                        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)} className="flex-1 sm:w-36 h-12 sm:h-10 bg-slate-950 sm:bg-slate-800 border border-slate-800 sm:border-slate-700 rounded-lg text-xs sm:text-sm text-white px-3 focus:outline-none cursor-pointer">
                          <option value="low">Low Priority</option>
                          <option value="medium">Med Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                        <button type="submit" disabled={!newTaskTitle.trim()} className="flex-1 sm:w-auto h-12 sm:h-10 px-6 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors disabled:opacity-50 shrink-0">
                          Commit
                        </button>
                      </div>
                    </form>

                    {/* Sorting Dropdown */}
                    <div className="relative w-full lg:w-48 shrink-0">
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)} 
                        className="w-full h-12 sm:h-[60px] lg:h-full appearance-none bg-slate-900 border border-slate-800 text-white text-sm font-bold rounded-xl pl-10 pr-4 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer shadow-xl"
                      >
                        <option value="priority">Sort: High Priority</option>
                        <option value="newest">Sort: Newest First</option>
                        <option value="oldest">Sort: Oldest First</option>
                      </select>
                      <ArrowDownWideNarrow className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* TODO Column */}
                    <div className="flex flex-col bg-slate-900/40 border border-slate-800 rounded-2xl p-3 sm:p-4 h-[550px] lg:h-[600px]">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 className="font-bold text-white flex items-center gap-2"><Circle className="w-4 h-4 text-amber-500" /> Pending Queue</h3>
                        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">{todoTasks.length}</span>
                      </div>
                      <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
                        <AnimatePresence mode="popLayout">
                          {todoTasks.map(task => (
                            <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                              <TaskCard task={task} onDelete={() => deleteTask(task.id)} rightAction={(time: number | undefined) => moveTask(task.id, "in-progress", time)} rightLabel="Deploy" />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {todoTasks.length === 0 && <EmptyState message="No pending tasks." />}
                      </div>
                    </div>

                    {/* IN PROGRESS Column */}
                    <div className="flex flex-col bg-slate-900/40 border border-slate-800 rounded-2xl p-3 sm:p-4 h-[550px] lg:h-[600px]">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 className="font-bold text-white flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500 animate-pulse" /> Processing</h3>
                        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">{progressTasks.length}</span>
                      </div>
                      <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
                        <AnimatePresence mode="popLayout">
                          {progressTasks.map(task => (
                            <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                              <TaskCard task={task} onDelete={() => deleteTask(task.id)} leftAction={(time: number | undefined) => moveTask(task.id, "todo", time)} rightAction={(time: number | undefined) => moveTask(task.id, "completed", time)} leftLabel="Revert" rightLabel="Resolve" isActive={true} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {progressTasks.length === 0 && <EmptyState message="No active processes." />}
                      </div>
                    </div>

                    {/* COMPLETED Column */}
                    <div className="flex flex-col bg-slate-900/40 border border-slate-800 rounded-2xl p-3 sm:p-4 h-[550px] lg:h-[600px]">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 className="font-bold text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Resolved</h3>
                        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">{completedTasks.length}</span>
                      </div>
                      <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
                        <AnimatePresence mode="popLayout">
                          {completedTasks.map(task => (
                            <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                              <TaskCard task={task} onDelete={() => deleteTask(task.id)} leftAction={(time: number | undefined) => moveTask(task.id, "in-progress", time)} leftLabel="Reopen" isCompleted={true} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {completedTasks.length === 0 && <EmptyState message="No completed tasks." />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: INVENTORY */}
              {activeTab === "inventory" && (
                <motion.div 
                  key="inventory"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-bold text-white">Product Catalog DB</h2>
                      <span className="text-[10px] sm:text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded bg-slate-950 hidden sm:block">Table: products_main</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap min-w-[600px]">
                        <thead className="text-[10px] sm:text-xs text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800">
                          <tr>
                            <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">SKU ID</th>
                            <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Product Description</th>
                            <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold text-right">Unit Price</th>
                            <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold text-right">Stock Level</th>
                            <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryData.map((item, i) => (
                            <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                              <td className="px-4 sm:px-5 py-3 sm:py-4 font-mono text-xs text-emerald-400">{item.sku}</td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4 font-bold text-slate-200">{item.product}</td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4 text-right text-slate-300">{item.price}</td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4 text-right font-mono text-white">{item.stock}</td>
                              <td className="px-4 sm:px-5 py-3 sm:py-4">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400' : item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: SQL CONSOLE */}
              {activeTab === "sql" && (
                <motion.div 
                  key="sql"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-slate-900 border-b border-slate-800">
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400">
                        <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> root@avida-cluster-01 ~ %
                      </div>
                      <button 
                        onClick={runQuery} disabled={queryRunning}
                        className="flex items-center h-8 px-3 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors disabled:opacity-50"
                      >
                        {queryRunning ? <RefreshCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 animate-spin" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" />}
                        Execute Query
                      </button>
                    </div>
                    
                    <textarea 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-transparent text-emerald-400 font-mono text-xs sm:text-sm p-4 sm:p-5 min-h-[150px] sm:min-h-[200px] focus:outline-none resize-y"
                      spellCheck="false"
                    />
                    
                    <div className="border-t border-slate-800 bg-[#0d1117] p-4 sm:p-5 min-h-[120px]">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Output Console</h4>
                      {queryRunning ? (
                        <div className="flex items-center text-slate-400 text-xs sm:text-sm font-mono"><RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 animate-spin" /> Processing query...</div>
                      ) : queryResult ? (
                        <pre className="text-[10px] sm:text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">{queryResult}</pre>
                      ) : (
                        <div className="text-[10px] sm:text-xs text-slate-600 font-mono italic">Awaiting execution...</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 sm:py-12 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-3 font-extrabold text-xl sm:text-2xl tracking-tight select-none">
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Avida.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="https://github.com/ALUKOISREAL" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors">
              <CustomGithubIcon className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/alukoisraell" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-slate-800 transition-colors">
              <CustomInstagramIcon className="h-4 w-4" />
            </a>
            <a href="tel:+917807277764" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-9 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-bold">+91 780 727 7764</span>
            </a>
          </div>

          <p className="text-center md:text-right text-slate-500 text-[10px] sm:text-sm font-medium">
            &copy; {new Date().getFullYear()} Aluko Israel Temiloluwa.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ==========================================
   SUPPORTING COMPONENTS
   ========================================== */
const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

// Zero-Lag Timer Component 
function ActiveTimer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
      <Clock className="w-2.5 h-2.5 text-blue-500" /> {formatTime(seconds)}
    </span>
  )
}

function TaskCard({ task, onDelete, leftAction, rightAction, leftLabel, rightLabel, isCompleted = false, isActive = false }: any) {
  const priorityColors = {
    high: "text-red-400 bg-red-500/10 border-red-500/20",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    low: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  }
  
  const [localTimeAdded, setLocalTimeAdded] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => setLocalTimeAdded(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className={`bg-slate-950 border p-3 sm:p-4 rounded-xl shadow-sm transition-colors hover:border-emerald-500/40 flex flex-col shrink-0 ${isCompleted ? 'border-slate-800/50 opacity-60' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1 ${priorityColors[task.priority as Priority]}`}>
          <Flag className="w-2.5 h-2.5" /> {task.priority}
        </span>
        {isActive ? (
          <ActiveTimer initialSeconds={task.timeSpentSeconds} />
        ) : task.timeSpentSeconds > 0 ? (
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {formatTime(task.timeSpentSeconds)}
          </span>
        ) : null}
      </div>
      <p className={`text-sm sm:text-base font-semibold mb-5 leading-snug break-words flex-grow ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
        {task.title}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-auto">
        <button onClick={onDelete} className="text-slate-600 hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-slate-900" title="Delete Task">
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {leftAction && (
            <button onClick={() => leftAction(localTimeAdded)} className="flex items-center h-8 px-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
              <ArrowLeftIcon className="w-3.5 h-3.5 mr-1" /> {leftLabel}
            </button>
          )}
          {rightAction && (
            <button onClick={() => rightAction(localTimeAdded)} className="flex items-center h-8 px-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-bold text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors">
              {rightLabel} <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20 opacity-50 shrink-0">
      <Info className="w-5 h-5 text-slate-600 mb-2" />
      <p className="text-xs font-medium text-slate-500">{message}</p>
    </div>
  )
}