"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  ArrowLeft, Layers, Code2, Phone, Sparkles, 
  ChevronDown, MousePointerClick, Zap, Shield, LayoutTemplate,
  Activity, RefreshCcw, Maximize, Mouse
} from "lucide-react"

// --- Custom SVGs for Standard Footer ---
const CustomGithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /></svg>
)
const CustomInstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)

export default function ProjectFour() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 flex flex-col overflow-x-hidden">
      <main className="flex-grow p-4 md:p-6 lg:p-10">
        <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-12">
          
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                    <Layers className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Synapse UI</h1>
                </div>
                <p className="text-slate-400 mt-2 text-sm max-w-2xl leading-relaxed">
                  Advanced interaction physics sandbox. Features steady, professional GPU-accelerated mechanics and real-time math inspectors. Zero layout jank.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto border border-slate-800 bg-slate-900 px-4 h-11 rounded-md shrink-0">
              <span className="flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-300">Framer Motion Engine Active</span>
            </div>
          </header>

          {/* Component Showcase Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Widget 1: Segmented Control & Inspector */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-center bg-slate-950/50 relative border-b md:border-b-0 md:border-r border-slate-800 min-h-[300px]">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <LayoutTemplate className="w-3.5 h-3.5" /> Dynamic Tabs
                </div>
                <AnimatedTabs />
              </div>
              <div className="w-full md:w-64 bg-[#0d1117] p-5 font-mono flex flex-col justify-center shrink-0">
                <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400" /> State Inspector</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">Layout ID</div>
                    <div className="text-xs text-indigo-300 font-bold bg-indigo-900/20 px-2 py-1 rounded">"active-pill"</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">Physics Params</div>
                    <div className="text-[10px] text-emerald-400">stiffness: 400</div>
                    <div className="text-[10px] text-emerald-400">damping: 30</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-[9px] text-slate-500 leading-relaxed">Smooth geometric transitions without shaky DOM reflows.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Widget 2: 3D Hover Card */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-center bg-slate-950/50 relative border-b md:border-b-0 md:border-r border-slate-800 min-h-[300px] perspective-[1000px]">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Maximize className="w-3.5 h-3.5" /> 3D Tilt Matrix
                </div>
                <TiltCard />
              </div>
              <div className="w-full md:w-64 bg-[#0d1117] p-5 font-mono flex flex-col justify-center shrink-0">
                <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Mouse className="w-3.5 h-3.5 text-indigo-400" /> Axis Tracking</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">X-Axis Transform</div>
                    <div className="text-xs text-amber-300 font-bold bg-amber-900/20 px-2 py-1 rounded">-15deg to 15deg</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">Y-Axis Transform</div>
                    <div className="text-xs text-amber-300 font-bold bg-amber-900/20 px-2 py-1 rounded">-15deg to 15deg</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-[9px] text-slate-500 leading-relaxed">Maps pointer coordinates to rotational axes via useTransform.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Widget 3: Expandable Smart Card */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-4 md:p-8 flex-1 flex flex-col justify-center items-center bg-slate-950/50 relative border-b md:border-b-0 md:border-r border-slate-800 min-h-[300px]">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Shield className="w-3.5 h-3.5" /> Smart Accordion
                </div>
                <ExpandableCard />
              </div>
              <div className="w-full md:w-64 bg-[#0d1117] p-5 font-mono flex flex-col justify-center shrink-0">
                <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-indigo-400" /> DOM Layout</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">AnimatePresence</div>
                    <div className="text-xs text-emerald-300 font-bold bg-emerald-900/20 px-2 py-1 rounded">Mode: "Sync"</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 mb-1">Height Calculation</div>
                    <div className="text-xs text-emerald-300 font-bold bg-emerald-900/20 px-2 py-1 rounded">"0px" &rarr; "auto"</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-[9px] text-slate-500 leading-relaxed">Prevents surrounding sibling elements from snapping violently.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Widget 4: Magnetic Button */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-center bg-slate-950/50 relative border-b md:border-b-0 md:border-r border-slate-800 min-h-[300px]">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <MousePointerClick className="w-3.5 h-3.5" /> Magnetic Elements
                </div>
                <MagneticButton />
              </div>
              {/* Note: The Magnetic Button inspector is handled inside the component so it can access the live X/Y values */}
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 sm:py-12 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-3 font-extrabold text-xl sm:text-2xl tracking-tight select-none">
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Avida.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="https://github.com/ALUKOISREAL" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 transition-colors">
              <CustomGithubIcon className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/alukoisraell" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-slate-800 transition-colors">
              <CustomInstagramIcon className="h-4 w-4" />
            </a>
            <a href="tel:+917807277764" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-9 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 transition-colors">
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

/* ===================================================================================
   WIDGET 1: ANIMATED TABS (Steady Layout Transition)
   =================================================================================== */
function AnimatedTabs() {
  const tabs = ["Frontend", "Database", "DevOps"]
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 w-full max-w-[300px] sm:max-w-none shadow-inner">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative w-full sm:w-auto px-6 py-3 text-sm font-bold transition-colors outline-none rounded-xl ${
            activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-indigo-600 rounded-xl shadow-[0_4px_12px_rgba(79,70,229,0.3)] border border-indigo-500"
              transition={{ type: "spring", stiffness: 400, damping: 35 }} // Very steady, no shaky bounce
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  )
}

/* ===================================================================================
   WIDGET 2: 3D TILT CARD (Mathematical Matrix Math)
   =================================================================================== */
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  // Map pointer coordinates to rotational degrees
  const rotateX = useTransform(y, [0, 1], [15, -15])
  const rotateY = useTransform(x, [0, 1], [-15, 15])

  // Apply steady springs to prevent jerky snapping
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate values from 0 to 1 based on mouse position within the card
    const pointerX = (e.clientX - rect.left) / rect.width
    const pointerY = (e.clientY - rect.top) / rect.height
    x.set(pointerX)
    y.set(pointerY)
  }

  const handleMouseLeave = () => {
    // Snap back to absolute center
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className="w-full max-w-[280px] aspect-[4/3] bg-gradient-to-br from-indigo-900/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between cursor-crosshair relative"
    >
      <div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
      
      <div style={{ transform: "translateZ(50px)" }} className="flex justify-between items-start z-10">
        <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/50 px-2 py-1 rounded">AVIDA-CORE</div>
      </div>
      
      <div style={{ transform: "translateZ(30px)" }} className="z-10">
        <h3 className="text-xl font-black text-white mb-1">GPU Accelerated</h3>
        <p className="text-xs text-indigo-200/70 font-medium leading-relaxed">Utilizing matrix transformations for true 3D spatial rotation.</p>
      </div>
    </motion.div>
  )
}

/* ===================================================================================
   WIDGET 3: EXPANDABLE SMART CARD
   =================================================================================== */
function ExpandableCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-indigo-500/40 transition-colors"
      transition={{ layout: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] } }} // Professional bezier curve
    >
      <motion.div layout className="p-5 flex justify-between items-center bg-slate-900 z-20 relative">
        <motion.div layout className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Order Fulfillment</h3>
            <p className="text-[10px] text-slate-500 font-mono">MyFavefit.ng - Vital Set</p>
          </div>
        </motion.div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="px-5 pb-5 pt-2 border-t border-slate-800/50 bg-slate-950/50">
              <p className="text-xs text-slate-400 leading-relaxed mb-4 font-medium">
                Logistics timeline synchronized. The shipment is currently en route to the Waknaghat distribution center in Himachal Pradesh.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md uppercase tracking-wider">In Transit</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wider">SKU: VIT-SET-BLK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ===================================================================================
   WIDGET 4: MAGNETIC BUTTON & ITS OWN INSPECTOR
   =================================================================================== */
function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Steady springs
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  // State to read out the live values for the inspector
  const [liveX, setLiveX] = useState(0)
  const [liveY, setLiveY] = useState(0)

  useEffect(() => {
    return springX.onChange(latest => setLiveX(Math.round(latest)))
  }, [springX])

  useEffect(() => {
    return springY.onChange(latest => setLiveY(Math.round(latest)))
  }, [springY])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3) // 30% pull
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <>
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex-1 min-h-[300px] flex items-center justify-center bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800"
      >
        <div className="w-48 h-48 border border-slate-800 border-dashed rounded-full flex items-center justify-center bg-indigo-900/5 relative">
          <div className="absolute top-0 text-[9px] font-mono text-slate-600 -translate-y-4">Magnetic Zone</div>
          
          <motion.button
            style={{ x: springX, y: springY }}
            className="w-36 h-14 bg-indigo-600 text-white text-sm font-extrabold rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-500 transition-colors gap-2 z-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
            <MousePointerClick className="w-4 h-4 relative z-10" /> 
            <span className="relative z-10">Pull Me</span>
          </motion.button>
        </div>
      </div>
      
      {/* Live Math Inspector */}
      <div className="w-full md:w-64 bg-[#0d1117] p-5 font-mono flex flex-col justify-center shrink-0">
        <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400" /> Vector Math</h4>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] text-slate-600 mb-1">Delta X (px)</div>
            <div className="text-xs text-sky-300 font-bold bg-sky-900/20 px-2 py-1 rounded w-16 text-center">{liveX}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-600 mb-1">Delta Y (px)</div>
            <div className="text-xs text-sky-300 font-bold bg-sky-900/20 px-2 py-1 rounded w-16 text-center">{liveY}</div>
          </div>
          <div className="pt-2 border-t border-slate-800">
            <p className="text-[9px] text-slate-500 leading-relaxed">Translates DOM coordinates to fractional pixel offsets.</p>
          </div>
        </div>
      </div>
    </>
  )
}