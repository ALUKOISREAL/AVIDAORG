"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { 
  ArrowUpRight, 
  ExternalLink, 
  Code2, 
  RotateCcw, 
  Terminal, 
  Layers, 
  Sparkles, 
  Gamepad2, 
  Zap, 
  Menu,
  UserCheck,
  Phone,
  ArrowLeftRight
} from "lucide-react"
import { toast, Toaster } from "sonner"

// Custom SVG component for GitHub
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
);

// Custom SVG component for Instagram
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
);

// Static data outside components to prevent costly re-renders
const projects = [
  { id: 1, title: "Project Alpha", description: "A high-performance web app built with Next.js and deployed globally.", tags: ["Next.js", "TypeScript", "Vercel"], metrics: { speed: "99% LCP", uptime: "99.9%" } },
  { id: 2, title: "Nexus Dashboard", description: "A real-time data dashboard for tracking business metrics and user events.", tags: ["React", "WebSockets", "Go"], metrics: { speed: "Fast", uptime: "100%" } },
  { id: 3, title: "Core Database", description: "A reliable backend API and database setup for managing user data.", tags: ["Prisma", "PostgreSQL", "Node.js"], metrics: { speed: "Sub-ms", uptime: "99.9%" } },
  { id: 4, title: "Synapse UI", description: "A clean, animated user interface built to test modern web design trends.", tags: ["Framer Motion", "Tailwind", "React"], metrics: { speed: "120 FPS", uptime: "N/A" } },
  { id: 5, title: "Cloud Toolkit", description: "Automated scripts and tools to help manage cloud servers easily.", tags: ["AWS", "Docker", "Terraform"], metrics: { speed: "Auto", uptime: "99.9%" } },
]

const skills = [
  { name: "Frontend Development", value: 94, tech: "Next.js, React, Tailwind, TS" },
  { name: "Backend Architecture", value: 85, tech: "Node.js, Go, PostgreSQL, Redis" },
  { name: "Cloud Integration", value: 78, tech: "AWS, Docker, CI/CD Actions" },
]

const memorySymbols = ["⚛️", "🚀", "💻", "🌐", "⚛️", "🚀", "💻", "🌐"]

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showTour, setShowTour] = useState(false)

  // Trigger the onboarding tour once when the page loads
  useEffect(() => {
    const hasSeenTour = sessionStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseTour = () => {
    setShowTour(false)
    sessionStorage.setItem('hasSeenTour', 'true')
  }

  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        <Toaster theme="dark" position="bottom-right" richColors />

        {/* Welcome Tour Modal */}
        <Dialog open={showTour} onOpenChange={handleCloseTour}>
          <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100 sm:max-w-md w-[90vw] p-6 shadow-2xl rounded-2xl">
            <DialogTitle className="sr-only">Welcome to my Portfolio</DialogTitle>
            <DialogDescription className="sr-only">A quick tour of the features available on this website.</DialogDescription>
            
            <div className="flex justify-center items-center mb-2">
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-950/30 font-bold tracking-widest uppercase text-xs">
                Welcome Guide
              </Badge>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex flex-col items-center text-center space-y-4 px-2 pb-4 pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                      <Sparkles className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">Welcome to My Space</h3>
                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">Explore my technical skills, dive into my latest projects, and get to know my development workflow.</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center text-center space-y-4 px-2 pb-4 pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30">
                      <Gamepad2 className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">Arcade Break</h3>
                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">Need a break? Play Tic-Tac-Toe, test your memory, or mine points in the Quantum Clicker built right into the page.</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col items-center text-center space-y-4 px-2 pb-4 pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                      <UserCheck className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">Let's Connect</h3>
                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-2">Check out my GitHub, drop a follow on Instagram, or reach out directly to build something great.</p>
                    <div 
                      onClick={handleCloseTour} 
                      className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer w-full transition-colors"
                    >
                      Get Started
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Mobile Swipe Hint */}
              <div className="flex justify-center items-center gap-2 mt-2 sm:hidden text-slate-400 text-xs font-semibold">
                <ArrowLeftRight className="w-3 h-3" /> Swipe to navigate
              </div>

              {/* Desktop Carousel Arrows */}
              <div className="hidden sm:flex justify-center gap-4 mt-4">
                <CarouselPrevious className="static translate-y-0 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white transition-colors" />
                <CarouselNext className="static translate-y-0 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white transition-colors" />
              </div>
            </Carousel>

            {/* Skip Button */}
            <div className="mt-4 flex justify-center border-t border-slate-800 pt-4">
              <button onClick={handleCloseTour} className="text-slate-400 hover:text-white text-sm font-semibold transition-colors">
                Skip Tour
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ULTRA-FAST BACKGROUNDS: Replaced expensive CSS blurs with zero-cost radial gradients */}
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_60%)] -z-10"></div>
        <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_60%)] -z-10"></div>

        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md shadow-sm">
          <div className="container flex h-16 items-center justify-between px-6 mx-auto">
            
            {/* Logo */}
            <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight select-none">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-sm">
                <Code2 className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-lg ring-1 ring-white/20"></div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Avida.</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">About</a>
              <a href="#skills" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#projects" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
              
              <a href="https://github.com/ALUKOISREAL" target="_blank" rel="noreferrer" tabIndex={-1}>
                <div className="inline-flex h-9 items-center justify-center rounded-md px-4 gap-2 border border-slate-700 bg-slate-900 text-sm text-slate-200 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-colors font-semibold cursor-pointer">
                  <CustomGithubIcon className="h-4 w-4" /> GitHub
                </div>
              </a>
            </nav>

            {/* Mobile Nav */}
            <div className="md:hidden flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger>
                  <div className="flex items-center justify-center h-10 w-10 rounded-md border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <Menu className="h-5 w-5" />
                  </div>
                </SheetTrigger>

                <SheetContent side="right" className="bg-slate-950 border-l border-cyan-500/20 flex flex-col pt-24 px-8 w-[85vw] sm:w-[350px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <DialogDescription className="sr-only">Main website navigation.</DialogDescription>

                  <div className="flex flex-col gap-6">
                    {[
                      { name: "About", href: "#about" },
                      { name: "Skills", href: "#skills" },
                      { name: "Projects", href: "#projects" },
                    ].map((item) => (
                      <a 
                        key={item.name}
                        href={item.href} 
                        onClick={() => setIsSheetOpen(false)}
                        className="text-3xl font-bold text-white hover:text-cyan-400 border-b border-slate-800 pb-4 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                    
                    <div className="pt-8">
                      <a href="https://github.com/ALUKOISREAL" target="_blank" rel="noreferrer" onClick={() => setIsSheetOpen(false)}>
                        <Button size="lg" className="w-full gap-3 bg-cyan-600 hover:bg-cyan-500 text-white text-lg h-14 font-semibold transition-colors">
                          <CustomGithubIcon className="h-6 w-6" /> Visit GitHub
                        </Button>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="container px-6 pt-28 pb-16 mx-auto space-y-24 md:space-y-32">
          
          {/* Main Hero & Profile Section */}
          <section id="about" className="space-y-16">
            
            {/* Top Grid: Hero Text & Arcade */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content (Text and Buttons) */}
              <div className="lg:col-span-7 flex flex-col items-start gap-6 md:gap-8">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="focus:outline-none hover:opacity-80 transition-opacity inline-block">
                      <Badge variant="outline" className="cursor-help px-4 py-1.5 rounded-md text-sm font-semibold border-emerald-500/40 text-emerald-400 bg-emerald-950/40 shadow-sm">
                        Available for work
                      </Badge>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="hidden sm:block bg-slate-900 border-emerald-500/30 text-white font-medium shadow-xl">
                    <p>Currently accepting new freelance projects and roles.</p>
                  </TooltipContent>
                </Tooltip>
                
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Building robust <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      web applications.
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
                    I am a full stack developer focused on writing clean, efficient code. I specialize in turning complex problems into simple, user-friendly digital experiences.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                  <a href="#projects" className="w-full sm:w-auto inline-block">
                    <div className="inline-flex items-center justify-center h-11 w-full px-8 gap-2 rounded-md text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer">
                      View Projects <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </a>
                  
                  <Dialog>
                    <DialogTrigger>
                      <div className="inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-semibold border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-colors cursor-pointer w-full sm:w-auto">
                        <Terminal className="h-5 w-5 text-cyan-400 mr-2" /> Read My Approach
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-950 border border-cyan-500/30 text-white max-w-md w-[90vw] shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-cyan-400 text-xl font-bold">My Development Approach</DialogTitle>
                        <DialogDescription className="text-slate-300 text-base pt-4 leading-relaxed space-y-3">
                          <span className="block"><strong>1. Performance First:</strong> I build apps that load fast and run smoothly.</span>
                          <span className="block"><strong>2. Clean Code:</strong> Easy to read, easy to maintain, and easy to scale.</span>
                          <span className="block"><strong>3. User-Centric:</strong> Technology should solve problems, not create them. I focus on the end-user experience.</span>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Arcade Component */}
              <div className="lg:col-span-5 flex justify-center w-full mt-12 lg:mt-0">
                <div className="w-full max-w-sm">
                  <ArcadeHub />
                </div>
              </div>
            </div>

            {/* Founder Profile Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] -z-10"></div>
              
              {/* High Quality Profile Avatar Container */}
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 shrink-0 rounded-full p-1 bg-slate-800 border border-slate-700">
                {/* IMPORTANT: For 4k/Crisp resolution, ensure your 'profile.jpg' 
                  file is genuinely high resolution (e.g. 1000x1000 pixels).
                */}
                <img
                  src="/profile.jpg"
                  alt="Aluko Israel Temiloluwa"
                  loading="eager"
                  style={{ imageRendering: 'auto' }}
                  className="w-full h-full rounded-full object-cover bg-slate-900"
                />
                <Tooltip>
                  <TooltipTrigger>
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 border-[3px] border-slate-900 rounded-full ring-4 ring-emerald-500/20" title="Online"></div>
                  </TooltipTrigger>
                  <TooltipContent className="hidden sm:block bg-slate-900 border-emerald-500/30 text-white shadow-xl">
                    Online
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Founder Text */}
              <div className="space-y-3 text-center sm:text-left z-10">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-cyan-400 font-bold tracking-widest text-sm uppercase">
                  <UserCheck className="h-4 w-4" /> Founder
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  Aluko Israel Temiloluwa
                </h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
                  Passionate about creating scalable and visually stunning web applications. Leading the way in modern full-stack development.
                </p>
              </div>
            </div>
            
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-32 space-y-8">
            <div className="flex items-center gap-3">
              <Layers className="h-7 w-7 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((skill, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-bold text-white">{skill.name}</CardTitle>
                      <span className="text-base text-cyan-400 font-bold">{skill.value}%</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={skill.value} className="h-2.5 bg-slate-800" />
                    <p className="text-sm font-medium text-slate-400">{skill.tech}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="bg-slate-800" />

          {/* Projects Carousel */}
          <section id="projects" className="scroll-mt-32 space-y-8 w-full relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-widest uppercase">
                  <Sparkles className="h-4 w-4" /> Portfolio
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Recent Projects</h2>
              </div>
              <p className="text-slate-300 text-base font-medium max-w-md">
                A collection of web applications, tools, and interfaces I have built recently. Swipe or click to explore.
              </p>
            </div>
            
            <div className="w-full px-0 sm:px-12">
              <Carousel 
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {projects.map((project) => (
                    <CarouselItem key={project.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <ProjectCard project={project} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12 border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-cyan-500/50 transition-colors" />
                <CarouselNext className="hidden sm:flex -right-4 md:-right-12 border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-cyan-500/50 transition-colors" />
              </Carousel>
            </div>
          </section>

          {/* Live Status Board */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-sm text-slate-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
                <span className="text-white font-bold text-base">System Overview</span>
              </div>
              <span className="text-cyan-400 text-xs font-bold font-mono bg-cyan-950/30 px-2 py-1 rounded">v1.0.0</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-medium">
              <div><strong className="text-white">Framework:</strong> Next.js 14</div>
              <div><strong className="text-white">Styling:</strong> Tailwind CSS</div>
              <div><strong className="text-white">Components:</strong> Shadcn UI</div>
              <div><strong className="text-white">Deployment:</strong> Vercel Global</div>
            </div>
          </section>
        </main>

        {/* Updated Custom Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 py-12">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-8 px-6 mx-auto">
            
            {/* Footer Logo Area */}
            <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight select-none">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Avida.</span>
            </div>

            {/* Personalized Contact Details */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Tooltip>
                <TooltipTrigger>
                  <a href="https://github.com/ALUKOISREAL" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors">
                    <CustomGithubIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="hidden sm:block bg-slate-900 border-slate-800 text-white font-medium">
                  github.com/ALUKOISREAL
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <a href="https://instagram.com/alukoisraell" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-slate-800 transition-colors">
                    <CustomInstagramIcon className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="hidden sm:block bg-slate-900 border-slate-800 text-white font-medium">
                  @alukoisraell
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <a href="tel:+917807277764" className="flex items-center gap-3 px-4 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-bold">+91 780 727 7764</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="hidden sm:block bg-slate-900 border-slate-800 text-white font-medium">
                  Click to Call
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Copyright */}
            <p className="text-center md:text-right text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Aluko Israel Temiloluwa.
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

/* ==========================================
   ARCADE HUB COMPONENT
   ========================================== */
function ArcadeHub() {
  return (
    <Card className="w-full bg-slate-900 border-slate-800 shadow-xl">
      <Tabs defaultValue="tictactoe" className="w-full">
        <CardHeader className="text-center pb-4 border-b border-slate-800">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-cyan-400 mb-4">
            <Gamepad2 className="h-5 w-5" /> Minigame Break
          </div>
          <TabsList className="grid grid-cols-3 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
            <TabsTrigger value="tictactoe" className="text-xs font-semibold data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors">Tic-Tac</TabsTrigger>
            <TabsTrigger value="memory" className="text-xs font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors">Memory</TabsTrigger>
            <TabsTrigger value="quantum" className="text-xs font-semibold data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors">Clicker</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <CardContent className="min-h-[300px] p-5">
          <TabsContent value="tictactoe" className="m-0 mt-2">
            <TicTacToeGame />
          </TabsContent>
          <TabsContent value="memory" className="m-0 mt-2">
            <MatrixMemoryGame />
          </TabsContent>
          <TabsContent value="quantum" className="m-0 mt-2">
            <QuantumClickerGame />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  const checkWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || checkWinner(board)) return
    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const winner = checkWinner(newBoard)
    if (winner) toast.success(`Player ${winner} wins!`)
    else if (!newBoard.includes(null)) toast.info("It's a draw!")
  }

  const winner = checkWinner(board)
  const status = winner ? `Winner: ${winner}` : !board.includes(null) ? "Draw!" : `Next up: ${isXNext ? "X" : "O"}`

  return (
    <div className="space-y-5">
      <div className="text-center text-sm font-bold text-white bg-slate-950 py-2.5 rounded-md border border-slate-800">{status}</div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="h-16 w-full rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-cyan-500/50 text-3xl font-bold flex items-center justify-center transition-colors cursor-pointer text-white"
          >
            {cell === "X" && <span className="text-cyan-400">X</span>}
            {cell === "O" && <span className="text-purple-400">O</span>}
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <div onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }} className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer w-full transition-colors">
          <RotateCcw className="h-4 w-4 mr-2" /> Reset Game
        </div>
      </div>
    </div>
  )
}

function MatrixMemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setCards([...memorySymbols].sort(() => Math.random() - 0.5))
    setFlipped([])
    setSolved([])
  }

  const handleCardClick = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) return
    const newFlipped = [...flipped, idx]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped])
        setFlipped([])
        if (solved.length + 2 === cards.length) {
          toast.success("You found all the pairs!")
        }
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center text-sm font-bold text-white bg-slate-950 py-2.5 rounded-md border border-slate-800">
        Pairs Found: <span className="text-purple-400">{solved.length / 2}</span> / {cards.length / 2}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || solved.includes(idx)
          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-14 w-full rounded-md text-2xl flex items-center justify-center transition-colors border cursor-pointer ${
                isFlipped 
                ? "bg-purple-900/50 border-purple-500 text-white" 
                : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-purple-500/50 text-slate-400" 
              }`}
            >
              {isFlipped ? card : "?"}
            </div>
          )
        })}
      </div>
      <div className="flex justify-center pt-2">
        <div onClick={initializeGame} className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer w-full transition-colors">
          <RotateCcw className="h-4 w-4 mr-2" /> Restart Game
        </div>
      </div>
    </div>
  )
}

function QuantumClickerGame() {
  const [points, setPoints] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const cost = multiplier * 20

  const buyUpgrade = () => {
    if (points >= cost) {
      setPoints(points - cost)
      setMultiplier(multiplier + 1)
      toast.success(`Click power increased to x${multiplier + 1}!`)
    } else {
      toast.error("Not enough points.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Points</div>
          <div className="text-3xl font-black text-teal-400">{points}</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Power</div>
          <div className="text-3xl font-black text-white">x{multiplier}</div>
        </div>
      </div>
      
      <div 
        onClick={() => setPoints(points + multiplier)}
        className="w-full py-8 rounded-xl border border-teal-500/30 bg-slate-800 hover:bg-slate-700 text-white flex flex-col justify-center items-center gap-3 transition-colors cursor-pointer"
      >
        <Zap className="h-8 w-8 text-teal-300" />
        <span className="text-base font-extrabold uppercase tracking-widest">Click to Mine</span>
      </div>

      <div className="w-full">
        <div 
          onClick={points >= cost ? buyUpgrade : undefined}
          className={`flex items-center justify-center h-11 w-full rounded-md border border-slate-600 text-white font-bold transition-colors ${points < cost ? "bg-slate-800 opacity-50 cursor-not-allowed" : "bg-slate-800 hover:bg-slate-700 cursor-pointer"}`}
        >
          Upgrade Click Power (Cost: {cost})
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="h-full flex flex-col justify-between bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-colors group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-xs font-bold border-slate-700 bg-slate-800 text-slate-200">
            {`0${project.id}`}
          </Badge>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-1 rounded-md">{project.metrics.speed}</span>
        </div>
        <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-slate-300 font-medium mt-2 text-sm line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pt-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="bg-slate-800 border border-slate-700 text-slate-200 font-semibold">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-slate-800 bg-slate-950/40 pt-5 pb-5 flex flex-col sm:flex-row gap-4">
        <HoverCard>
          <HoverCardTrigger>
            <div className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer w-full">
              <CustomGithubIcon className="h-4 w-4 mr-2" /> Code
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-slate-900 border border-slate-800 text-sm font-medium text-white shadow-xl">
            View the source code on GitHub.
          </HoverCardContent>
        </HoverCard>

        <Tooltip>
          <TooltipTrigger>
            <div className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors w-full cursor-pointer">
              Live Demo <ExternalLink className="h-4 w-4 ml-2" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="hidden sm:block bg-slate-900 border-cyan-500/40 text-white">
            Visit the live project website
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}