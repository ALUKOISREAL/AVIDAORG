"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { 
  ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Activity, 
  Search, Code2, Phone, RotateCcw, AlertTriangle, Trophy, PieChart, ChevronDown
} from "lucide-react"

// --- Custom SVGs for Footer ---
const CustomGithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /></svg>
)
const CustomInstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)

// --- API Types & Fallback Data ---
interface CryptoAsset {
  id: string; rank: string; symbol: string; name: string; priceUsd: string; changePercent24Hr: string; marketCapUsd: string;
}

const fallbackData: CryptoAsset[] = [
  { id: "bitcoin", rank: "1", symbol: "BTC", name: "Bitcoin", priceUsd: "64532.21", changePercent24Hr: "2.34", marketCapUsd: "1270000000000" },
  { id: "ethereum", rank: "2", symbol: "ETH", name: "Ethereum", priceUsd: "3456.78", changePercent24Hr: "-1.12", marketCapUsd: "415000000000" },
  { id: "tether", rank: "3", symbol: "USDT", name: "Tether", priceUsd: "1.00", changePercent24Hr: "0.01", marketCapUsd: "103000000000" },
  { id: "binance-coin", rank: "4", symbol: "BNB", name: "BNB", priceUsd: "589.43", changePercent24Hr: "4.56", marketCapUsd: "88000000000" },
  { id: "solana", rank: "5", symbol: "SOL", name: "Solana", priceUsd: "145.22", changePercent24Hr: "8.90", marketCapUsd: "65000000000" },
  { id: "ripple", rank: "6", symbol: "XRP", name: "XRP", priceUsd: "0.58", changePercent24Hr: "-0.45", marketCapUsd: "32000000000" },
  { id: "usdc", rank: "7", symbol: "USDC", name: "USDC", priceUsd: "1.00", changePercent24Hr: "0.00", marketCapUsd: "32000000000" },
  { id: "dogecoin", rank: "8", symbol: "DOGE", name: "Dogecoin", priceUsd: "0.15", changePercent24Hr: "12.4", marketCapUsd: "21000000000" },
  { id: "toncoin", rank: "9", symbol: "TON", name: "Toncoin", priceUsd: "6.20", changePercent24Hr: "-2.1", marketCapUsd: "20000000000" },
  { id: "cardano", rank: "10", symbol: "ADA", name: "Cardano", priceUsd: "0.45", changePercent24Hr: "1.2", marketCapUsd: "16000000000" },
  { id: "avalanche", rank: "11", symbol: "AVAX", name: "Avalanche", priceUsd: "35.60", changePercent24Hr: "5.4", marketCapUsd: "13000000000" },
  { id: "shiba-inu", rank: "12", symbol: "SHIB", name: "Shiba Inu", priceUsd: "0.00002", changePercent24Hr: "-4.2", marketCapUsd: "11000000000" },
]

// --- Zero Dependency SVG Sparkline ---
const MiniSparkline = ({ isPositive, id }: { isPositive: boolean; id: string }) => {
  const points = useMemo(() => {
    let currentY = 20;
    return Array.from({ length: 15 }).map((_, i) => {
      const volatility = (id.length % 5) + 2;
      const change = (Math.random() - (isPositive ? 0.3 : 0.7)) * volatility;
      currentY = Math.max(2, Math.min(38, currentY + change));
      return `${i * 5},${currentY}`;
    }).join(" L ");
  }, [id, isPositive]);

  return (
    <svg width="75" height="30" viewBox="0 0 75 40" className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
      <path d={`M 0,${isPositive ? '30' : '10'} L ${points}`} fill="none" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function ProjectAlpha() {
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<"live" | "simulated">("live")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  // Controls
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change">("rank")

  const fetchCryptoData = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://api.coincap.io/v2/assets?limit=12", { cache: 'no-store' })
      if (!res.ok) throw new Error("API Offline")
      const json = await res.json()
      setAssets(json.data)
      setStatus("live")
    } catch (err) {
      setAssets(fallbackData)
      setStatus("simulated")
    } finally {
      setLastUpdated(new Date())
      setLoading(false)
    }
  }

  useEffect(() => { fetchCryptoData() }, [])

  // Smart Sorting & Analytics
  const { processedAssets, topGainer, topLoser, domBtc, domEth, domAlts } = useMemo(() => {
    let filtered = assets.filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    filtered.sort((a, b) => {
      if (sortBy === "price") return parseFloat(b.priceUsd) - parseFloat(a.priceUsd)
      if (sortBy === "change") return parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
      return parseInt(a.rank) - parseInt(b.rank)
    })

    const sortedByChange = [...assets].sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
    const gainer = sortedByChange[0]
    const loser = sortedByChange[sortedByChange.length - 1]

    const totalCap = assets.reduce((sum, c) => sum + parseFloat(c.marketCapUsd || "0"), 0)
    const btcCap = parseFloat(assets.find(c => c.symbol === "BTC")?.marketCapUsd || "0")
    const ethCap = parseFloat(assets.find(c => c.symbol === "ETH")?.marketCapUsd || "0")
    
    return {
      processedAssets: filtered,
      topGainer: gainer,
      topLoser: loser,
      domBtc: totalCap > 0 ? (btcCap / totalCap) * 100 : 50,
      domEth: totalCap > 0 ? (ethCap / totalCap) * 100 : 20,
      domAlts: totalCap > 0 ? ((totalCap - btcCap - ethCap) / totalCap) * 100 : 30
    }
  }, [assets, searchQuery, sortBy])

  const formatCurrency = (val: string) => {
    const num = parseFloat(val)
    if (num < 0.01) return `$${num.toFixed(5)}`
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
  }
  const formatCompact = (val: string) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2 }).format(parseFloat(val))
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden flex flex-col">
      <main className="flex-grow p-4 md:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Market Alpha</h1>
                </div>
                <p className="text-slate-400 mt-2 text-sm max-w-lg">
                  High-performance live dashboard. Built with zero-dependency CSS charts, smart sorting, and an interactive crypto arcade.
                </p>
              </div>
            </div>

            {/* UPGRADED MOBILE CONTROLS */}
            <div className="flex flex-col w-full lg:w-auto gap-3">
              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute inset-y-0 left-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-9 pr-4 h-10 bg-slate-900 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-sm" 
                />
              </div>
              
              {/* Dropdown & Refresh Row (Side by side on mobile) */}
              <div className="flex flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-40">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)} 
                    className="w-full h-10 bg-slate-900 border border-slate-700 rounded-md text-sm text-white pl-3 pr-8 appearance-none focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
                  >
                    <option value="rank">Sort: Rank</option>
                    <option value="price">Sort: Price</option>
                    <option value="change">Sort: 24h%</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
                
                <button 
                  onClick={fetchCryptoData} 
                  disabled={loading} 
                  className="flex-1 lg:w-32 flex items-center justify-center h-10 rounded-md border border-slate-700 bg-cyan-600/10 text-sm font-semibold text-cyan-400 hover:bg-cyan-600/20 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 mr-1.5 sm:mr-2 ${loading ? "animate-spin" : ""}`} />
                  {loading ? "Updating" : "Refresh"}
                </button>
              </div>
            </div>
          </header>

          {/* Top Movers & Dominance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-white">
                <span className="flex items-center gap-2"><PieChart className="w-4 h-4 text-cyan-400" /> Dominance</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-mono font-medium">Top 12 Weight</span>
              </div>
              <div className="w-full h-2 sm:h-3 flex rounded-full overflow-hidden mb-2 sm:mb-3 bg-slate-800">
                <div style={{ width: `${domBtc}%` }} className="bg-orange-500 transition-all duration-1000"></div>
                <div style={{ width: `${domEth}%` }} className="bg-blue-500 transition-all duration-1000"></div>
                <div style={{ width: `${domAlts}%` }} className="bg-emerald-500 transition-all duration-1000"></div>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> BTC {domBtc.toFixed(1)}%</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> ETH {domEth.toFixed(1)}%</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Alts {domAlts.toFixed(1)}%</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-bold text-white">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Top Gainer
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-bold text-emerald-400">{topGainer?.symbol || "--"}</div>
                  <div className="text-[10px] sm:text-xs text-emerald-500/70">{topGainer ? `+${parseFloat(topGainer.changePercent24Hr).toFixed(2)}%` : ""}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-bold text-white">
                  <TrendingDown className="w-4 h-4 text-red-400" /> Top Loser
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm font-bold text-red-400">{topLoser?.symbol || "--"}</div>
                  <div className="text-[10px] sm:text-xs text-red-500/70">{topLoser ? `${parseFloat(topLoser.changePercent24Hr).toFixed(2)}%` : ""}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className={`flex items-center justify-between border rounded-lg p-3 text-[11px] sm:text-sm transition-colors ${status === "live" ? "bg-slate-900/50 border-slate-800" : "bg-amber-950/20 border-amber-500/30"}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "live" ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-full w-full ${status === "live" ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={`font-semibold ${status === "live" ? "text-slate-300" : "text-amber-400"}`}>
                {status === "live" ? "Live API Connected" : "Simulated Data Active (API Blocked)"}
              </span>
            </div>
            <span className="text-slate-500 font-mono text-[10px] sm:text-xs shrink-0">Up: {lastUpdated.toLocaleTimeString()}</span>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {loading && assets.length === 0 ? (
              Array(12).fill(0).map((_, i) => <div key={i} className="h-36 bg-slate-900 border border-slate-800 rounded-xl animate-pulse"></div>)
            ) : processedAssets.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-slate-900 border border-slate-800 rounded-xl">No assets match your search.</div>
            ) : (
              processedAssets.map((coin) => {
                const change = parseFloat(coin.changePercent24Hr)
                const isPositive = change >= 0

                return (
                  <div key={coin.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col justify-between h-full min-h-[140px]">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-xs text-slate-300 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors shadow-inner shrink-0">
                          {coin.symbol}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-white font-bold leading-tight truncate text-sm sm:text-base mb-0.5">{coin.name}</h3>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono">Rank #{coin.rank}</p>
                        </div>
                      </div>
                      <div className={`flex items-center text-[10px] sm:text-xs font-bold px-1.5 py-1 sm:px-2 rounded-md shrink-0 ${isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {isPositive ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />}
                        {Math.abs(change).toFixed(2)}%
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {formatCurrency(coin.priceUsd)}
                        </div>
                        <div className="flex items-center text-[10px] sm:text-xs font-medium text-slate-500">
                          Cap: {formatCompact(coin.marketCapUsd)}
                        </div>
                      </div>
                      <MiniSparkline isPositive={isPositive} id={coin.id} />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Crypto Arcade */}
          <section className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-slate-800">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
                <Code2 className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" /> Crypto Arcade 2.0
              </h2>
              <p className="text-slate-400 mt-2 text-xs sm:text-sm">Lightweight, lag-free minigames built with pure React state.</p>
            </div>
            <div className="max-w-xl mx-auto w-full">
              <CryptoArcadeHub fallbackData={fallbackData} />
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 sm:py-12 mt-8 sm:mt-12">
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
   NEW ARCADE COMPONENTS (Zero Lag, Mobile Optimized)
   ========================================== */
function CryptoArcadeHub({ fallbackData }: { fallbackData: CryptoAsset[] }) {
  const [activeTab, setActiveTab] = useState("crash")

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex bg-slate-950 border-b border-slate-800 p-2 gap-2">
        <button onClick={() => setActiveTab("crash")} className={`flex-1 text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-md transition-colors ${activeTab === "crash" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>Diamond Hands</button>
        <button onClick={() => setActiveTab("higherlower")} className={`flex-1 text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-md transition-colors ${activeTab === "higherlower" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>Higher / Lower</button>
      </div>
      <div className="p-4 sm:p-6 min-h-[300px] sm:min-h-[320px] flex flex-col justify-center">
        {activeTab === "crash" && <DiamondHandsGame />}
        {activeTab === "higherlower" && <HigherLowerGame data={fallbackData} />}
      </div>
    </div>
  )
}

// GAME 1: Diamond Hands (Crash Simulator)
function DiamondHandsGame() {
  const [status, setStatus] = useState<"idle" | "running" | "cashed_out" | "crashed">("idle")
  const [multiplier, setMultiplier] = useState(1.00)
  const [crashPoint, setCrashPoint] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setStatus("running")
    setMultiplier(1.00)
    setCrashPoint(1.1 + Math.random() * 3.9)
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = prev + 0.05
        if (next >= crashPoint) {
          clearInterval(intervalRef.current!)
          setStatus("crashed")
          return crashPoint
        }
        return next
      })
    }, 100)
  }

  const cashOut = () => {
    if (status === "running") {
      clearInterval(intervalRef.current!)
      setStatus("cashed_out")
    }
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="space-y-6 text-center">
      <div className="text-xs sm:text-sm font-bold text-slate-400 flex items-center justify-center gap-2">
        <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Crash Simulator
      </div>
      
      <div className={`text-5xl sm:text-6xl font-black transition-colors ${status === "crashed" ? "text-red-500" : status === "cashed_out" ? "text-emerald-400" : "text-white"}`}>
        {multiplier.toFixed(2)}x
      </div>
      
      <div className="h-6 text-xs sm:text-sm font-bold">
        {status === "crashed" && <span className="text-red-400 flex items-center justify-center gap-1"><AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4"/> REKT! Crashed.</span>}
        {status === "cashed_out" && <span className="text-emerald-400 flex items-center justify-center gap-1"><Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4"/> Profit Secured!</span>}
        {status === "idle" && <span className="text-slate-500">Don't get greedy.</span>}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-4">
        <button onClick={startGame} disabled={status === "running"} className="h-10 sm:h-12 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-bold hover:bg-slate-700 transition-colors disabled:opacity-50">
          {status === "idle" ? "Start Trade" : "Play Again"}
        </button>
        <button onClick={cashOut} disabled={status !== "running"} className="h-10 sm:h-12 rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:bg-slate-800">
          CASH OUT
        </button>
      </div>
    </div>
  )
}

// GAME 2: Higher/Lower Market Cap Trivia
function HigherLowerGame({ data }: { data: CryptoAsset[] }) {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)

  const handleGuess = (guess: "higher" | "lower") => {
    const currentCap = parseFloat(data[currentIndex].marketCapUsd)
    const nextCap = parseFloat(data[nextIndex].marketCapUsd)
    const isHigher = nextCap > currentCap

    if ((guess === "higher" && isHigher) || (guess === "lower" && !isHigher)) {
      setScore(s => s + 1)
      setCurrentIndex(nextIndex)
      let randomNext = Math.floor(Math.random() * data.length)
      while (randomNext === nextIndex) randomNext = Math.floor(Math.random() * data.length)
      setNextIndex(randomNext)
    } else {
      setGameOver(true)
    }
  }

  const reset = () => {
    setScore(0); setGameOver(false); setCurrentIndex(0); setNextIndex(1)
  }

  const currentCoin = data[currentIndex]
  const nextCoin = data[nextIndex]

  if (gameOver) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-red-400">Game Over!</h3>
        <p className="text-slate-300 text-sm sm:text-base">You scored <span className="text-white font-black text-xl sm:text-2xl">{score}</span> points.</p>
        <button onClick={reset} className="mx-auto flex items-center h-10 px-6 rounded-md bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-bold hover:bg-slate-700 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 text-center">
      <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-400 border-b border-slate-800 pb-2">
        <span>Market Cap Trivia</span>
        <span className="bg-slate-800 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-white">Score: {score}</span>
      </div>

      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="flex-1 bg-slate-950 border border-slate-800 p-3 sm:p-4 rounded-xl min-w-0">
          <div className="text-[10px] sm:text-xs text-slate-500 mb-0.5 sm:mb-1 truncate">{currentCoin.name}</div>
          <div className="text-base sm:text-lg font-black text-white">{currentCoin.symbol}</div>
        </div>
        
        <div className="text-slate-600 font-bold text-[10px] sm:text-sm shrink-0">VS</div>

        <div className="flex-1 bg-slate-950 border border-slate-800 p-3 sm:p-4 rounded-xl border-t-cyan-500 min-w-0">
          <div className="text-[10px] sm:text-xs text-slate-500 mb-0.5 sm:mb-1 truncate">{nextCoin.name}</div>
          <div className="text-base sm:text-lg font-black text-white">{nextCoin.symbol}</div>
        </div>
      </div>

      <div className="text-xs sm:text-sm font-medium text-slate-300 px-2">
        Does <strong className="text-white">{nextCoin.name}</strong> have a higher or lower market cap than {currentCoin.name}?
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button onClick={() => handleGuess("higher")} className="h-10 sm:h-12 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-bold hover:bg-emerald-600 hover:text-white transition-colors flex justify-center items-center gap-1.5 sm:gap-2">
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> HIGHER
        </button>
        <button onClick={() => handleGuess("lower")} className="h-10 sm:h-12 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs sm:text-sm font-bold hover:bg-red-600 hover:text-white transition-colors flex justify-center items-center gap-1.5 sm:gap-2">
          <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> LOWER
        </button>
      </div>
    </div>
  )
}