"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ArrowLeft, Activity, Users, DollarSign, Zap, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Code2, Phone,
  Info, Server, Globe, TerminalSquare, DownloadCloud, 
  ShieldAlert, Clock, ChevronDown
} from "lucide-react"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts"

// --- Custom SVGs for Standard Footer ---
const CustomGithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /></svg>
)
const CustomInstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)

// --- Dummy Data Arrays ---
const revenueData = [
  { name: "Jan", total: 1200 }, { name: "Feb", total: 2100 }, { name: "Mar", total: 1800 },
  { name: "Apr", total: 3200 }, { name: "May", total: 3800 }, { name: "Jun", total: 4200 },
  { name: "Jul", total: 5100 },
]

const trafficData = [
  { name: "Mon", desktop: 140, mobile: 280 }, { name: "Tue", desktop: 180, mobile: 250 },
  { name: "Wed", desktop: 250, mobile: 320 }, { name: "Thu", desktop: 210, mobile: 290 },
  { name: "Fri", desktop: 280, mobile: 350 }, { name: "Sat", desktop: 320, mobile: 410 },
  { name: "Sun", desktop: 290, mobile: 380 },
]

const recentActivity = [
  { id: 1, user: "Alex Chen", action: "Upgraded to Pro Plan", time: "2 mins ago", amount: "+$49.00", status: "success", daysAgo: 0 },
  { id: 2, user: "Sarah Smith", action: "Downgraded Plan", time: "45 mins ago", amount: "-$12.00", status: "warning", daysAgo: 0 },
  { id: 3, user: "Michael Ray", action: "Purchased Add-on", time: "2 hours ago", amount: "+$15.00", status: "success", daysAgo: 1 },
  { id: 4, user: "Emma Wilson", action: "Annual Renewal", time: "5 hours ago", amount: "+$490.00", status: "success", daysAgo: 2 },
  { id: 5, user: "David Kim", action: "Payment Failed", time: "6 hours ago", amount: "$0.00", status: "error", daysAgo: 5 },
  { id: 6, user: "Lisa Wang", action: "Upgraded to Enterprise", time: "1 day ago", amount: "+$999.00", status: "success", daysAgo: 10 },
]

const countries = [
  { name: "United States", value: 45, color: "bg-blue-500" },
  { name: "India", value: 25, color: "bg-emerald-500" },
  { name: "United Kingdom", value: 15, color: "bg-purple-500" },
  { name: "Germany", value: 10, color: "bg-amber-500" },
  { name: "Others", value: 5, color: "bg-slate-500" },
]

export default function NexusDashboard() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(7)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // NATIVE CSV EXPORT ENGINE
  const exportToCSV = () => {
    setIsExporting(true)
    try {
      const headers = ["Transaction ID", "Customer Name", "Action Taken", "Amount", "Status", "Timestamp"]
      const filteredData = recentActivity.filter(item => item.daysAgo <= timeRange)
      
      const rows = filteredData.map(item => [
        item.id,
        `"${item.user}"`,
        `"${item.action}"`,
        `"${item.amount}"`,
        item.status,
        `"${item.time}"`
      ])

      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      
      link.setAttribute("href", url)
      link.setAttribute("download", `nexus_export_${timeRange}days.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Export failed", error)
    } finally {
      setTimeout(() => setIsExporting(false), 500)
    }
  }

  if (!isMounted) return null

  const filteredActivity = recentActivity.filter(item => item.daysAgo <= timeRange)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden flex flex-col">
      <main className="flex-grow p-4 md:p-6 lg:p-10">
        <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
          
          {/* Header & Controls */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Nexus Analytics</h1>
                </div>
                <p className="text-slate-400 mt-2 text-sm max-w-lg">
                  Enterprise-grade command center. Visualizes massive datasets, real-time server traffic, and user demographics.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Mobile-Optimized Dropdown Wrapper */}
              <div className="relative w-full sm:w-40 shrink-0">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(Number(e.target.value))}
                  className="w-full appearance-none bg-slate-900 border border-slate-700 text-white text-sm font-medium rounded-md h-11 pl-4 pr-10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm transition-colors cursor-pointer"
                >
                  <option value={7}>Last 7 Days</option>
                  <option value={30}>Last 30 Days</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button 
                onClick={exportToCSV}
                disabled={isExporting || isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-md border border-slate-700 bg-purple-600/10 text-sm font-bold text-purple-400 hover:bg-purple-600/20 hover:border-purple-500/50 transition-colors disabled:opacity-50 shrink-0"
              >
                <DownloadCloud className={`w-4 h-4 mr-2 ${isExporting ? 'animate-bounce' : ''}`} /> 
                {isExporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-900 border border-slate-800 rounded-xl animate-pulse"></div>)}
              <div className="lg:col-span-4 h-[400px] bg-slate-900 border border-slate-800 rounded-xl animate-pulse mt-4"></div>
            </div>
          ) : (
            <>
              {/* KPI Grid with Hint Tooltips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
                <KpiCard title="Total Revenue" value="$45,231.89" change="+20.1%" isPositive={true} icon={<DollarSign className="w-4 h-4" />} hint="Monthly Recurring Revenue (MRR) calculated after transaction fees." />
                <KpiCard title="Active Users" value="2,350" change="+180.1%" isPositive={true} icon={<Users className="w-4 h-4" />} hint="Users who have logged in and interacted within the last 72 hours." />
                <KpiCard title="Server Load" value="42.8%" change="-5.2%" isPositive={true} icon={<Server className="w-4 h-4" />} hint="Current CPU utilization across the primary distributed cluster." />
                <KpiCard title="Churn Rate" value="1.2%" change="+0.4%" isPositive={false} icon={<Activity className="w-4 h-4" />} hint="Percentage of users who canceled their subscription this month." />
              </div>

              {/* Top Heavy Row: Revenue & Demographics */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                
                {/* Revenue Line Chart */}
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center">
                        Financial Overview <TooltipIcon text="Visualizes total net income month over month." />
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">YTD Revenue Growth Projection</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 self-start sm:self-auto">
                      <span className="flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-300">Live API</span>
                    </div>
                  </div>
                  <div className="flex-grow min-h-[250px] sm:min-h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} itemStyle={{ color: '#a855f7', fontWeight: 'bold' }} />
                        <Area type="monotone" dataKey="total" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* System & Geography Column */}
                <div className="flex flex-col gap-5">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1">
                    <h3 className="text-sm font-bold text-white flex items-center mb-5">
                      <Globe className="w-4 h-4 mr-2 text-blue-400" /> User Demographics
                    </h3>
                    <div className="space-y-4">
                      {countries.map(country => (
                        <div key={country.name}>
                          <div className="flex justify-between text-xs font-medium mb-1.5 text-slate-300">
                            <span>{country.name}</span>
                            <span>{country.value}%</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                            <div className={`${country.color} h-full rounded-full`} style={{ width: `${country.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
                    <h3 className="text-sm font-bold text-white flex items-center mb-4">
                      <Zap className="w-4 h-4 mr-2 text-amber-400" /> System Resources
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">CPU Usage</div>
                        <div className="text-xl font-black text-amber-400">42%</div>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">RAM (32GB)</div>
                        <div className="text-xl font-black text-blue-400">68%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Traffic vs Transactions vs Terminal Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                
                {/* Traffic Device Bar Chart */}
                <div className="xl:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col">
                  <h3 className="text-base font-bold text-white flex items-center mb-1">
                    Device Traffic <TooltipIcon text="Breaks down incoming API requests by device type." />
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">Mobile vs Desktop metrics.</p>
                  <div className="flex-grow min-h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '11px' }} cursor={{fill: '#1e293b', opacity: 0.4}} />
                        <Bar dataKey="desktop" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="mobile" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Transactions Table - Mobile Optimized with overflow-x-auto */}
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-0 sm:p-5 shadow-xl overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-4 p-4 sm:p-0">
                    <div>
                      <h3 className="text-base font-bold text-white">Transaction Ledger</h3>
                      <p className="text-xs text-slate-400 mt-1">Filtered by: Last {timeRange} Days</p>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold bg-slate-800 px-2 sm:px-3 py-1 rounded-full text-slate-300">
                      {filteredActivity.length} Records
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto px-4 sm:px-0 pb-4 sm:pb-0">
                    <table className="w-full text-xs sm:text-sm text-left min-w-[500px]">
                      <thead className="text-[10px] text-slate-500 uppercase bg-slate-950/50 border-y border-slate-800">
                        <tr>
                          <th className="px-3 py-3 font-semibold">Customer</th>
                          <th className="px-3 py-3 font-semibold">Action</th>
                          <th className="px-3 py-3 font-semibold">Time</th>
                          <th className="px-3 py-3 text-right font-semibold">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredActivity.length > 0 ? (
                          filteredActivity.map((item) => (
                            <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                              <td className="px-3 py-3 font-bold text-slate-200 whitespace-nowrap">{item.user}</td>
                              <td className="px-3 py-3 text-slate-400 text-xs whitespace-nowrap">{item.action}</td>
                              <td className="px-3 py-3 text-slate-500 text-[10px] whitespace-nowrap flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {item.time}
                              </td>
                              <td className={`px-3 py-3 text-right font-black whitespace-nowrap ${item.status === 'success' ? 'text-emerald-400' : item.status === 'error' ? 'text-red-400' : 'text-amber-400'}`}>
                                {item.amount}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-3 py-8 text-center text-slate-500">No records found for this time range.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System Alerts & Live Terminal Feed */}
                <div className="xl:col-span-1 flex flex-col gap-5">
                  <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 flex items-start gap-3 shadow-xl">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-red-400 mb-1">Security Alert</h4>
                      <p className="text-xs text-red-400/70 leading-relaxed">Multiple failed login attempts detected. Firewall rules updated.</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow bg-black border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col font-mono min-h-[200px]">
                    <h3 className="text-xs font-bold text-slate-500 flex items-center mb-3 uppercase tracking-widest border-b border-slate-800 pb-2">
                      <TerminalSquare className="w-3.5 h-3.5 mr-2" /> Server Logs
                    </h3>
                    <LiveTerminalFeed />
                  </div>
                </div>

              </div>
            </>
          )}

        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 sm:py-12 mt-8">
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

function TooltipIcon({ text }: { text: string }) {
  return (
    <div className="relative group flex items-center ml-2 cursor-help">
      <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 border border-slate-700 text-[10px] font-normal text-slate-200 rounded-md shadow-xl z-50 pointer-events-none text-center leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, change, isPositive, icon, hint }: { title: string, value: string, change: string, isPositive: boolean, icon: React.ReactNode, hint: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-purple-500/40 transition-colors shadow-lg group">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-400 flex items-center">
          {title} <TooltipIcon text={hint} />
        </h3>
        <div className="text-purple-400 bg-purple-500/10 p-1.5 rounded-md border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <div className="text-2xl sm:text-3xl font-black text-white">{value}</div>
        <div className={`flex items-center text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {change}
        </div>
      </div>
    </div>
  )
}

function LiveTerminalFeed() {
  const [logs, setLogs] = useState([
    "[SYSTEM] Initiating server connection...",
    "[INFO] Port 8080 active. Awaiting traffic.",
  ])

  useEffect(() => {
    const actions = ["GET /api/users 200", "POST /api/payment 201", "GET /assets/main.js 304", "WARN DB query slow", "GET /dashboard 200", "AUTH Token generated"]
    const ips = ["192.168.1.1", "10.0.0.45", "172.16.254.1", "198.51.100.2", "103.117.xx.xx"]

    const interval = setInterval(() => {
      setLogs(prev => {
        const action = actions[Math.floor(Math.random() * actions.length)]
        const ip = ips[Math.floor(Math.random() * ips.length)]
        const time = new Date().toISOString().split("T")[1].substring(0, 8)
        const newLog = `[${time}] ${ip} - ${action}`
        
        const nextLogs = [...prev, newLog]
        if (nextLogs.length > 7) nextLogs.shift() 
        return nextLogs
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-grow flex flex-col justify-end text-[10px] sm:text-[11px] text-slate-500 leading-relaxed overflow-hidden">
      {logs.map((log, i) => (
        <div key={i} className={`truncate ${i === logs.length - 1 ? 'text-emerald-400' : ''} ${log.includes("WARN") ? 'text-amber-400' : ''} ${log.includes("AUTH") ? 'text-purple-400' : ''}`}>
          <span className="opacity-50 mr-1">&gt;</span> {log}
        </div>
      ))}
      <div className="text-emerald-400 animate-pulse mt-1">_</div>
    </div>
  )
}