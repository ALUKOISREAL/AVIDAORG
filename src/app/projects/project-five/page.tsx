"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Wrench,
  Code2,
  Phone,
  FileJson,
  Binary,
  KeyRound,
  Copy,
  Check,
  AlertCircle,
  Trash2,
  Settings2,
  Activity,
  Cpu,
  Play,
  TerminalSquare,
  Layout,
} from "lucide-react"

/* ==========================================================================
   CUSTOM ICONS
   ========================================================================== */

const CustomGithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

const CustomInstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */

export default function ProjectFive() {
  const [isMounted, setIsMounted] = useState(false)

  const [activeTab, setActiveTab] = useState<
    "json" | "base64" | "password" | "compiler"
  >("compiler")

  const [toast, setToast] = useState({
    show: false,
    message: "",
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showToast = (message: string) => {
    setToast({
      show: true,
      message,
    })

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
      })
    }, 2000)
  }

  const copyToClipboard = async (text: string) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      showToast("Copied to clipboard!")
    } catch {
      showToast("Clipboard access failed.")
    }
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 flex flex-col overflow-x-hidden">
      {/* TOAST */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toast.show
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="bg-sky-500 text-white text-sm font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          {toast.message}
        </div>
      </div>

      <main className="flex-grow p-4 md:p-6 lg:p-10">
        <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
          {/* HEADER */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>

              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                    <Wrench className="w-5 h-5 text-sky-400" />
                  </div>

                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Cloud DevKit
                  </h1>
                </div>

                <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
                  Local developer utility suite. Performs complex data
                  formatting, compiling, and cryptography entirely on the client
                  utilizing Web APIs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto border border-slate-800 bg-slate-900 px-4 h-11 rounded-md shrink-0">
              <span className="flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>

              <span className="text-xs font-bold text-slate-300">
                Local Compute Engine
              </span>
            </div>
          </header>

          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* SIDEBAR */}
            <div className="w-full xl:w-64 shrink-0 flex flex-row xl:flex-col gap-2 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scrollbar-hide">
              <SidebarButton
                active={activeTab === "compiler"}
                onClick={() => setActiveTab("compiler")}
                icon={<Code2 className="w-4 h-4 shrink-0" />}
                label="Code Compiler"
              />

              <SidebarButton
                active={activeTab === "json"}
                onClick={() => setActiveTab("json")}
                icon={<FileJson className="w-4 h-4 shrink-0" />}
                label="JSON Formatter"
              />

              <SidebarButton
                active={activeTab === "base64"}
                onClick={() => setActiveTab("base64")}
                icon={<Binary className="w-4 h-4 shrink-0" />}
                label="Base64 Coder"
              />

              <SidebarButton
                active={activeTab === "password"}
                onClick={() => setActiveTab("password")}
                icon={<KeyRound className="w-4 h-4 shrink-0" />}
                label="Hash & KeyGen"
              />

              <div className="hidden xl:flex mt-auto pt-8 flex-col gap-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5" />
                    System Status
                  </div>

                  <div className="text-[10px] text-slate-500 leading-relaxed mb-3">
                    All operations are sandboxed. No data leaves your browser
                    environment.
                  </div>

                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 w-1/4 h-full rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-grow min-h-[600px]">
              {activeTab === "compiler" && <LiveCompiler />}
              {activeTab === "json" && (
                <JsonFormatter copy={copyToClipboard} />
              )}
              {activeTab === "base64" && (
                <Base64Tool copy={copyToClipboard} />
              )}
              {activeTab === "password" && (
                <PasswordGenerator copy={copyToClipboard} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 sm:py-12 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-3 font-extrabold text-xl sm:text-2xl tracking-tight select-none">
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
            </div>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Avida.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com/ALUKOISREAL"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-slate-800 transition-colors"
            >
              <CustomGithubIcon className="h-4 w-4" />
            </a>

            <a
              href="https://instagram.com/alukoisraell"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-slate-800 transition-colors"
            >
              <CustomInstagramIcon className="h-4 w-4" />
            </a>

            <a
              href="tel:+917807277764"
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-9 sm:h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-slate-800 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

              <span className="text-xs sm:text-sm font-bold">
                +91 780 727 7764
              </span>
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

/* ==========================================================================
   SIDEBAR BUTTON
   ========================================================================== */

type SidebarButtonProps = {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function SidebarButton({
  active,
  onClick,
  icon,
  label,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap xl:whitespace-normal font-semibold text-sm shrink-0 ${
        active
          ? "bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-inner"
          : "bg-slate-900/50 text-slate-400 border border-transparent hover:bg-slate-900 hover:text-slate-200"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/* ==========================================================================
   LIVE COMPILER
   ========================================================================== */

function LiveCompiler() {
  const [language, setLanguage] = useState<
    "web" | "python" | "typescript"
  >("web")

  const [htmlCode, setHtmlCode] = useState(
    `<div class="box">\n  <h1>Hello Avida</h1>\n</div>`
  )

  const [cssCode, setCssCode] = useState(
    `body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #0f172a; }\n.box { background: #0ea5e9; padding: 20px 40px; border-radius: 12px; color: white; box-shadow: 0 10px 25px rgba(14,165,233,0.3); }`
  )

  const [jsCode, setJsCode] = useState(
    `document.querySelector('.box').addEventListener('click', () => {\n  alert('Component executed!');\n});`
  )

  const [scriptCode, setScriptCode] = useState(
    `def calculate_distribution():\n    print("Calculating Poisson distribution...")\n    return {"status": 200, "data": [1, 4, 6, 4, 1]}\n\ncalculate_distribution()`
  )

  const [terminalOutput, setTerminalOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>

        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `
  }, [htmlCode, cssCode, jsCode])

  const runScript = () => {
    setIsRunning(true)
    setTerminalOutput("")

    setTimeout(() => {
      setTerminalOutput(
        `> Initiating ${language} execution environment...\n> Running script in isolated container.\n\nOutput:\nCalculating Poisson distribution...\n{'status': 200, 'data': [1, 4, 6, 4, 1]}\n\n> Execution completed in 142ms.`
      )

      setIsRunning(false)
    }, 800)
  }

  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[700px] lg:h-[600px] overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <CompilerTab
            active={language === "web"}
            onClick={() => setLanguage("web")}
            label="Web (HTML/JS)"
          />

          <CompilerTab
            active={language === "python"}
            onClick={() => setLanguage("python")}
            label="Python 3"
          />

          <CompilerTab
            active={language === "typescript"}
            onClick={() => setLanguage("typescript")}
            label="TypeScript"
          />
        </div>

        {language !== "web" && (
          <button
            onClick={runScript}
            disabled={isRunning}
            className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? (
              <Activity className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}

            Run Script
          </button>
        )}
      </div>

      {language === "web" ? (
        <div className="flex flex-col lg:flex-row flex-grow min-h-0">
          <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 h-1/2 lg:h-full">
            <Editor
              title="index.html"
              titleColor="text-sky-400"
              value={htmlCode}
              onChange={setHtmlCode}
            />

            <Editor
              title="style.css"
              titleColor="text-pink-400"
              value={cssCode}
              onChange={setCssCode}
            />
          </div>

          <div className="flex-1 flex flex-col bg-white h-1/2 lg:h-full">
            <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 shrink-0">
              <Layout className="w-3 h-3" />
              Live Render Preview
            </div>

            <iframe
              srcDoc={srcDoc}
              title="preview"
              sandbox="allow-scripts"
              className="flex-grow w-full h-full border-none"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row flex-grow min-h-0">
          <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 h-1/2 lg:h-full">
            <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold tracking-widest text-sky-400 shrink-0">
              main.{language === "python" ? "py" : "ts"}
            </div>

            <textarea
              value={scriptCode}
              onChange={(e) => setScriptCode(e.target.value)}
              className="flex-grow w-full bg-transparent text-sky-200 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="flex-1 flex flex-col bg-black h-1/2 lg:h-full">
            <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-2">
                <TerminalSquare className="w-3.5 h-3.5" />
                Output Console
              </span>
            </div>

            <div className="flex-grow overflow-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700">
              {isRunning ? (
                <div className="text-emerald-400 font-mono text-xs animate-pulse">
                  Running execution sandbox...
                </div>
              ) : terminalOutput ? (
                <pre className="text-slate-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {terminalOutput}
                </pre>
              ) : (
                <div className="text-slate-600 font-mono text-xs italic">
                  Hit Run Script to execute via backend simulation.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   COMPILER TAB
   ========================================================================== */

type CompilerTabProps = {
  active: boolean
  onClick: () => void
  label: string
}

function CompilerTab({
  active,
  onClick,
  label,
}: CompilerTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
        active
          ? "bg-sky-600 text-white"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  )
}

/* ==========================================================================
   EDITOR
   ========================================================================== */

type EditorProps = {
  title: string
  titleColor: string
  value: string
  onChange: (value: string) => void
}

function Editor({
  title,
  titleColor,
  value,
  onChange,
}: EditorProps) {
  return (
    <div className="flex-1 flex flex-col border-b border-slate-800">
      <div
        className={`bg-slate-950 px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold tracking-widest ${titleColor}`}
      >
        {title}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow w-full bg-transparent text-slate-300 font-mono text-[11px] sm:text-xs p-3 focus:outline-none resize-none"
        spellCheck={false}
      />
    </div>
  )
}

/* ==========================================================================
   JSON FORMATTER
   ========================================================================== */

function JsonFormatter({
  copy,
}: {
  copy: (text: string) => void
}) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)

  const formatJson = () => {
    if (!input.trim()) return

    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2))
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Invalid JSON syntax"
      )
      setOutput("")
    }
  }

  const minifyJson = () => {
    if (!input.trim()) return

    try {
      setOutput(JSON.stringify(JSON.parse(input)))
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Invalid JSON syntax"
      )
      setOutput("")
    }
  }

  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[700px] lg:h-[600px] overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-sky-400" />
          Parser Config
        </div>

        <div className="flex gap-2">
          <button
            onClick={formatJson}
            className="h-9 px-3 sm:px-4 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-md transition-colors"
          >
            Format
          </button>

          <button
            onClick={minifyJson}
            className="h-9 px-3 sm:px-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold rounded-md transition-colors"
          >
            Minify
          </button>

          <button
            onClick={() => {
              setInput("")
              setOutput("")
              setError(null)
            }}
            className="h-9 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow min-h-0">
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 h-1/2 lg:h-full">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold tracking-widest text-slate-500 shrink-0">
            Raw Input
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste messy JSON here..."
            className="flex-grow w-full bg-transparent text-sky-300 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="flex-1 flex flex-col relative bg-[#090b0e] h-1/2 lg:h-full">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Parsed Output
            </span>

            <button
              onClick={() => copy(output)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-grow overflow-auto p-4">
            {error ? (
              <div className="flex items-start gap-2 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-md text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            ) : output ? (
              <pre className="text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed">
                {output}
              </pre>
            ) : (
              <div className="text-slate-600 font-mono text-xs italic">
                Awaiting valid JSON...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   BASE64 TOOL
   ========================================================================== */

function Base64Tool({
  copy,
}: {
  copy: (text: string) => void
}) {
  const [text, setText] = useState("")
  const [base64, setBase64] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleTextChange = (value: string) => {
    setText(value)
    setError(null)

    try {
      setBase64(btoa(unescape(encodeURIComponent(value))))
    } catch {
      setBase64("")
    }
  }

  const handleBase64Change = (value: string) => {
    setBase64(value)
    setError(null)

    try {
      setText(decodeURIComponent(escape(atob(value))))
    } catch {
      setError("Invalid Base64 string")
      setText("")
    }
  }

  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[700px] lg:h-[600px] overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Binary className="w-4 h-4 text-sky-400" />
          B64 Codec
        </div>

        <button
          onClick={() => {
            setText("")
            setBase64("")
            setError(null)
          }}
          className="h-8 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold rounded-md transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow min-h-0">
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 h-1/2 lg:h-full">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Plain Text (UTF-8)
            </span>

            <button
              onClick={() => copy(text)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type standard text here to encode..."
            className="flex-grow w-full bg-transparent text-emerald-400 font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="flex-1 flex flex-col bg-[#090b0e] h-1/2 lg:h-full">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-2">
              Base64 Format
            </span>

            <button
              onClick={() => copy(base64)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={base64}
            onChange={(e) => handleBase64Change(e.target.value)}
            placeholder="Paste Base64 here to decode..."
            className={`flex-grow w-full bg-transparent font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed break-all ${
              error
                ? "text-red-400 bg-red-950/10"
                : "text-sky-300"
            }`}
          />
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   PASSWORD GENERATOR
   ========================================================================== */

function PasswordGenerator({
  copy,
}: {
  copy: (text: string) => void
}) {
  const [length, setLength] = useState(32)

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const [password, setPassword] = useState("")

  const generate = () => {
    let charset = ""

    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (options.numbers) charset += "0123456789"
    if (options.symbols)
      charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if (!charset) {
      setPassword("Select at least one charset.")
      return
    }

    const array = new Uint32Array(length)

    window.crypto.getRandomValues(array)

    let result = ""

    for (let index = 0; index < length; index += 1) {
      result += charset[array[index] % charset.length]
    }

    setPassword(result)
  }

  useEffect(() => {
    generate()
  }, [])

  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-auto md:h-[600px] overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-4 flex items-center justify-between shrink-0">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400" />
          Crypto KeyGen
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-10 justify-center max-w-2xl mx-auto w-full gap-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-black border border-slate-700 rounded-xl p-4 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="font-mono text-base sm:text-2xl text-emerald-400 break-all leading-tight text-center sm:text-left">
              {password}
            </div>

            <button
              onClick={() => copy(password)}
              className="h-10 w-10 shrink-0 rounded-full bg-slate-800 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-xl space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4 text-sm font-bold text-slate-300">
              <span>Entropy Length</span>

              <span className="bg-slate-950 px-3 py-1 rounded-md border border-slate-800 text-sky-400">
                {length} chars
              </span>
            </div>

            <input
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Checkbox
              checked={options.uppercase}
              onChange={(value) =>
                setOptions({
                  ...options,
                  uppercase: value,
                })
              }
              label="Uppercase (A-Z)"
            />

            <Checkbox
              checked={options.lowercase}
              onChange={(value) =>
                setOptions({
                  ...options,
                  lowercase: value,
                })
              }
              label="Lowercase (a-z)"
            />

            <Checkbox
              checked={options.numbers}
              onChange={(value) =>
                setOptions({
                  ...options,
                  numbers: value,
                })
              }
              label="Numbers (0-9)"
            />

            <Checkbox
              checked={options.symbols}
              onChange={(value) =>
                setOptions({
                  ...options,
                  symbols: value,
                })
              }
              label="Symbols (!@#$)"
            />
          </div>

          <button
            onClick={generate}
            className="w-full h-12 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Generate New Key
          </button>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   CHECKBOX
   ========================================================================== */

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

function Checkbox({
  checked,
  onChange,
  label,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-sky-500"
      />

      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>
    </label>
  )
}