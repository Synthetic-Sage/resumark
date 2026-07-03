import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, BrainCircuit, Search, MousePointerClick, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const VARIANTS = [
  {
    id: 'ats',
    name: 'ATS Standard',
    pros: ['100% Machine Readable', 'Recruiter Familiarity'],
    cons: ['Less Visual Flair']
  },
  {
    id: 'creative',
    name: 'Creative / Startup',
    pros: ['Instantly Memorable', 'Shows Design Skills'],
    cons: ['May fail older ATS']
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    pros: ['Focuses on Impact Metrics', 'High Data Density'],
    cons: ['Requires strong track record']
  },
  {
    id: 'designer',
    name: 'Designer Portfolio',
    pros: ['Dark Mode Aesthetic', 'High Contrast Typography'],
    cons: ['Not traditional corporate']
  },
  {
    id: 'academic',
    name: 'Academic CV',
    pros: ['Dense Information', 'Classic Serif Authority'],
    cons: ['Can look text-heavy']
  }
];

export default function AnatomySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play loop every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VARIANTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const variant = VARIANTS[currentIndex];

  const floatAnimation: any = {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  // Variants for the slide-up animation
  const slideUpVariants = {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.3, // This staggers the tooltips!
        delayChildren: 0.3
      } 
    },
    exit: { opacity: 0, y: -100, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const tooltipVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <section className="relative min-h-screen bg-onyx-50 border-y border-onyx-200 pt-32 pb-20 flex flex-col items-center overflow-hidden">
      
      {/* Title and Controls */}
      <div className="text-center z-40 shrink-0 relative px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-onyx-900 mb-6">Anatomy of a Perfect Resume</h2>
        
        {/* Progress / Manual Toggles */}
        <div className="flex items-center justify-center gap-2 bg-white/50 p-1.5 rounded-full mx-auto w-fit border border-onyx-200 shadow-sm backdrop-blur-md">
          {VARIANTS.map((v, i) => (
            <button 
              key={v.id}
              onClick={() => setCurrentIndex(i)}
              className={`px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-300 ${currentIndex === i ? 'bg-onyx-900 shadow-md text-white' : 'text-onyx-500 hover:text-onyx-700 hover:bg-onyx-100/50'}`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Scene Container */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center perspective-[1500px] mt-12 lg:mt-16 px-4">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={variant.id}
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16"
          >
            
            {/* LEFT: Pros & Cons */}
            <div className="w-full lg:w-1/4 max-w-sm shrink-0">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-onyx-200 transform lg:translate-x-8">
                <h4 className="font-bold text-onyx-900 mb-4 border-b border-onyx-100 pb-3 text-lg">{variant.name}</h4>
                <ul className="space-y-4 text-sm">
                  {variant.pros.map((pro, idx) => (
                    <li key={`pro-${idx}`} className="flex items-start gap-3 text-emerald-700">
                      <CheckCircle size={18} className="shrink-0 mt-0.5"/> 
                      <span className="font-medium">{pro}</span>
                    </li>
                  ))}
                  {variant.cons.map((con, idx) => (
                    <li key={`con-${idx}`} className="flex items-start gap-3 text-rose-700">
                      <XCircle size={18} className="shrink-0 mt-0.5"/> 
                      <span className="font-medium">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CENTER: The Resume Paper */}
            <div className="relative h-[65vh] min-h-[500px] max-h-[700px] aspect-[1/1.414] transform-style-3d z-20 shrink-0">
              
              <motion.div 
                className="w-full h-full"
                animate={floatAnimation}
                style={{ rotateX: 10, rotateY: -10, rotateZ: 1 }}
              >
                {/* Base Shadow */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-onyx-900/15 rounded-[100%] blur-3xl transform translate-z-[-80px]"></div>

                {/* The Paper (Removed overflow-hidden so tooltips can bleed out) */}
                <div className="absolute inset-0 bg-white border border-onyx-200 shadow-2xl rounded p-6 lg:p-10 flex flex-col">
                  
                  {variant.id === 'ats' && (
                    <div className="h-full flex flex-col gap-6 lg:gap-8 relative">
                      {/* ATS FORMAT */}
                      <div className="border-b-2 border-onyx-800 pb-4 text-center relative">
                        <h3 className="text-2xl lg:text-4xl font-serif font-bold text-onyx-900 uppercase tracking-wide">Sarah Jenkins</h3>
                        <p className="text-xs lg:text-sm text-onyx-600 mt-2">San Francisco, CA • sarah@design.io • (555) 123-4567</p>
                        
                        {/* Tooltip Anchor: Header */}
                        <motion.div variants={tooltipVariants} className="absolute top-1/2 left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                          <div className="w-12 h-[1px] bg-brand-400 shrink-0"></div>
                          <div className="w-2 h-2 rounded-full bg-brand-500 -ml-1 border border-white shrink-0 shadow-sm"></div>
                          <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <div className="flex items-center gap-2 text-brand-600 mb-1.5">
                              <Eye size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">The F-Pattern</span>
                            </div>
                            <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Centered headers ensure immediate parsing by standard ATS bots.</p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <h4 className="text-[10px] lg:text-xs font-bold text-onyx-900 uppercase tracking-widest mb-2 border-b border-onyx-100 pb-1">Professional Summary</h4>
                        <p className="text-[10px] lg:text-xs text-onyx-800 leading-relaxed">
                          Award-winning Product Designer with 7+ years of experience specializing in B2B SaaS interfaces. Proven track record of increasing user retention by 40% through intuitive, accessible design systems and rigorous A/B testing methodologies.
                        </p>
                      </div>

                      <div className="relative">
                        <h4 className="text-[10px] lg:text-xs font-bold text-onyx-900 uppercase tracking-widest mb-3 border-b border-onyx-100 pb-1">Experience</h4>
                        <div className="mb-4">
                          <div className="flex justify-between items-baseline mb-1">
                            <h5 className="font-bold text-onyx-900 text-xs lg:text-sm">Lead Designer, TechFlow</h5>
                            <span className="text-[9px] lg:text-xs text-onyx-600 font-medium">2021 — Present</span>
                          </div>
                          <ul className="text-[10px] lg:text-xs text-onyx-700 space-y-1.5 list-disc list-outside ml-4">
                            <li><strong className="text-onyx-900">Spearheaded</strong> the redesign of the core analytics dashboard, resulting in a 25% decrease in support tickets.</li>
                            <li><strong className="text-onyx-900">Orchestrated</strong> a complete migration to Figma, saving the design team 15 hours weekly.</li>
                          </ul>
                        </div>
                        
                        {/* Tooltip Anchor: Experience */}
                        <motion.div variants={tooltipVariants} className="absolute top-[30%] left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                          <div className="w-12 h-[1px] bg-emerald-400 shrink-0"></div>
                          <div className="w-2 h-2 rounded-full bg-emerald-500 -ml-1 border border-white shrink-0 shadow-sm"></div>
                          <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
                              <MousePointerClick size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Action-Verbs</span>
                            </div>
                            <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Standard formats require front-loading impactful verbs for extreme skimmability.</p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative mt-auto">
                        <h4 className="text-[10px] lg:text-xs font-bold text-onyx-900 uppercase tracking-widest mb-2 border-b border-onyx-100 pb-1">Skills</h4>
                        <p className="text-[10px] lg:text-xs text-onyx-700 leading-relaxed">
                          <strong>Design:</strong> UI/UX, Interaction Design, Prototyping, Wireframing, User Testing<br/>
                          <strong>Tools:</strong> Figma, Adobe CC, Framer, Webflow, HTML/CSS
                        </p>
                      </div>
                    </div>
                  )}

                  {variant.id === 'creative' && (
                    <div className="h-full flex gap-4 lg:gap-6 relative">
                      {/* Left Column (Dark) */}
                      <div className="w-1/3 bg-onyx-900 rounded-lg p-4 lg:p-6 text-onyx-100 flex flex-col gap-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-500"></div>
                        <div>
                          <h3 className="text-lg lg:text-3xl font-bold text-white leading-tight">Sarah<br/>Jenkins</h3>
                          <p className="text-[9px] lg:text-sm text-brand-400 mt-2 font-medium">UI/UX Designer</p>
                        </div>
                        
                        <div className="text-[8px] lg:text-xs text-onyx-300 space-y-2 mt-4">
                          <p>San Francisco, CA</p>
                          <p>sarah@design.io</p>
                          <p>(555) 123-4567</p>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-[9px] lg:text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-onyx-800 pb-2">Expertise</h4>
                          <div className="flex flex-col gap-2 text-[8px] lg:text-[10px]">
                            <span className="bg-onyx-800 px-3 py-1.5 rounded text-center">Interaction Design</span>
                            <span className="bg-onyx-800 px-3 py-1.5 rounded text-center">Prototyping</span>
                            <span className="bg-onyx-800 px-3 py-1.5 rounded text-center">Figma</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Light) */}
                      <div className="w-2/3 py-2 flex flex-col gap-6 relative">
                        <div>
                          <h4 className="text-[9px] lg:text-xs font-bold text-onyx-400 uppercase tracking-widest mb-2 border-b border-onyx-100 pb-1">Profile</h4>
                          <p className="text-[9px] lg:text-xs text-onyx-800 leading-relaxed">
                            Award-winning Product Designer with 7+ years of experience specializing in B2B SaaS interfaces. Proven track record of increasing user retention by 40% through intuitive design systems.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-[9px] lg:text-xs font-bold text-brand-600 uppercase tracking-widest mb-3 border-b border-onyx-100 pb-1">Experience</h4>
                          <div className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                              <h5 className="font-bold text-onyx-900 text-[10px] lg:text-sm">Lead Designer <span className="font-normal text-onyx-500">| TechFlow</span></h5>
                            </div>
                            <span className="text-[8px] lg:text-[10px] text-onyx-400 block mb-2 font-medium">2021 — Present</span>
                            <ul className="text-[9px] lg:text-xs text-onyx-700 space-y-2 list-disc list-outside ml-4">
                              <li>Redesigned core analytics dashboard, reducing support tickets by 25%.</li>
                              <li>Orchestrated Figma migration, saving 15 hours weekly.</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Tooltip Anchor: Multi-Column */}
                        <motion.div variants={tooltipVariants} className="absolute top-[40%] left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                          <div className="w-12 h-[1px] bg-purple-400 shrink-0"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-500 -ml-1 border border-white shrink-0 shadow-sm"></div>
                          <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                            <div className="flex items-center gap-2 text-purple-600 mb-1.5">
                              <BrainCircuit size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Visual Hierarchy</span>
                            </div>
                            <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Sidebars create an instant visual break, organizing metadata separately from core experience.</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {variant.id === 'executive' && (
                    <div className="h-full flex flex-col gap-6 lg:gap-8 relative">
                      {/* EXECUTIVE FORMAT */}
                      <div className="border-b-4 border-onyx-900 pb-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-2xl lg:text-4xl font-serif font-bold text-onyx-900">SARAH JENKINS</h3>
                            <p className="text-xs lg:text-sm text-brand-700 font-bold tracking-widest uppercase mt-1">VP of Product Design</p>
                          </div>
                          <div className="text-right text-[9px] lg:text-xs text-onyx-600 space-y-0.5">
                            <p>sarah@design.io</p>
                            <p>(555) 123-4567</p>
                            <p>linkedin.com/in/sarahj</p>
                          </div>
                        </div>
                        
                        {/* Tooltip Anchor: Header */}
                        <motion.div variants={tooltipVariants} className="absolute top-8 left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                          <div className="w-12 h-[1px] bg-blue-400 shrink-0"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 -ml-1 border border-white shrink-0 shadow-sm"></div>
                          <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <div className="flex items-center gap-2 text-blue-600 mb-1.5">
                              <Search size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Authoritative Header</span>
                            </div>
                            <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Heavy borders and bold sans-serif titles immediately establish seniority.</p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <h4 className="text-[10px] lg:text-sm font-bold text-onyx-900 mb-2 border-b-2 border-onyx-200 pb-1">EXECUTIVE SUMMARY</h4>
                        <p className="text-[10px] lg:text-xs text-onyx-800 leading-relaxed font-medium">
                          Design leader with 10+ years driving product strategy for Fortune 500 companies. Directed teams of 20+ designers to launch enterprise SaaS platforms generating $50M+ in ARR.
                        </p>
                      </div>

                      <div className="relative">
                        <h4 className="text-[10px] lg:text-sm font-bold text-onyx-900 mb-3 border-b-2 border-onyx-200 pb-1">LEADERSHIP EXPERIENCE</h4>
                        <div className="mb-4">
                          <div className="flex justify-between items-baseline mb-1">
                            <h5 className="font-bold text-onyx-900 text-[11px] lg:text-sm">Director of Product Design</h5>
                            <span className="text-[9px] lg:text-xs text-onyx-800 font-bold">TechFlow | 2020 — Present</span>
                          </div>
                          <ul className="text-[10px] lg:text-xs text-onyx-800 space-y-2 list-none ml-0 mt-3">
                            <li className="flex gap-2">
                              <TrendingUp size={14} className="text-brand-600 shrink-0 mt-0.5"/>
                              <span>Scaled design organization from 3 to 24 product designers across 4 global offices, establishing a unified design system.</span>
                            </li>
                            <li className="flex gap-2">
                              <TrendingUp size={14} className="text-brand-600 shrink-0 mt-0.5"/>
                              <span>Led the 2023 product overhaul which directly contributed to a 115% increase in enterprise customer retention.</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Tooltip Anchor: Experience */}
                        <motion.div variants={tooltipVariants} className="absolute top-[50%] left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                          <div className="w-12 h-[1px] bg-amber-500 shrink-0"></div>
                          <div className="w-2 h-2 rounded-full bg-amber-600 -ml-1 border border-white shrink-0 shadow-sm"></div>
                          <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <div className="flex items-center gap-2 text-amber-600 mb-1.5">
                              <TrendingUp size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Impact Metrics</span>
                            </div>
                            <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Executive resumes replace standard bullet points with data-dense impact statements.</p>
                          </div>
                        </motion.div>
                      </div>

                    </div>
                  )}

                  {variant.id === 'designer' && (
                    <div className="h-full flex flex-col relative bg-slate-950 text-slate-300 p-6 rounded-lg overflow-hidden font-sans border-2 border-brand-500/20">
                      <div className="absolute top-0 left-0 w-2 h-full bg-brand-500"></div>
                      <div className="mb-6 flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl lg:text-4xl font-bold text-white tracking-tighter uppercase mb-1">Sarah<br/>Jenkins</h3>
                          <div className="h-1 w-12 bg-brand-500 mb-2"></div>
                          <p className="text-xs text-brand-400 font-mono">Product Designer</p>
                        </div>
                        <div className="text-right text-[9px] lg:text-[10px] font-mono space-y-1 opacity-60">
                          <p>SF, CA</p>
                          <p>sarah@design.io</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-6 flex-1">
                        <div className="col-span-4 border-r border-slate-800 pr-4">
                          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3 text-brand-500">Skills</h4>
                          <div className="flex flex-col gap-2 text-[9px] opacity-80">
                            <span>UI/UX Design</span>
                            <span>Prototyping</span>
                            <span>Design Systems</span>
                            <span>Figma / Framer</span>
                          </div>
                        </div>
                        <div className="col-span-8">
                          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3 text-brand-500">Experience</h4>
                          <div className="mb-4">
                            <h5 className="font-bold text-white text-[11px] mb-1">TechFlow <span className="opacity-50 font-normal">| Lead Designer</span></h5>
                            <ul className="text-[9px] space-y-1.5 opacity-80 list-disc ml-3 mt-2">
                              <li>Architected Dark Mode system utilized by 2M users.</li>
                              <li>Reduced onboarding drop-off by 15% via A/B testing.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tooltip Anchor: Dark Mode */}
                      <motion.div variants={tooltipVariants} className="absolute top-[30%] left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                        <div className="w-12 h-[1px] bg-pink-400 shrink-0"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-500 -ml-1 border border-white shrink-0 shadow-sm"></div>
                        <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                          <div className="flex items-center gap-2 text-pink-600 mb-1.5">
                            <Eye size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Dark UI</span>
                          </div>
                          <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Instantly stands out in a stack of white papers, showcasing UI proficiency.</p>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {variant.id === 'academic' && (
                    <div className="h-full flex flex-col gap-4 relative font-serif">
                      <div className="text-center border-b border-onyx-300 pb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-onyx-900 mb-2">Dr. Sarah Jenkins</h3>
                        <p className="text-[10px] lg:text-xs text-onyx-700 italic">Department of Cognitive Science • Stanford University</p>
                      </div>

                      <div>
                        <h4 className="text-[11px] lg:text-xs font-bold text-onyx-900 uppercase tracking-widest mb-1 border-b border-onyx-200">Education</h4>
                        <div className="text-[10px] lg:text-[11px] text-onyx-800 mt-2">
                          <div className="flex justify-between font-bold text-onyx-900">
                            <span>Ph.D. in Cognitive Science</span>
                            <span>Stanford University (2020)</span>
                          </div>
                          <p className="italic mt-0.5">Dissertation: "HCI and Visual Parsing in Digital Environments"</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[11px] lg:text-xs font-bold text-onyx-900 uppercase tracking-widest mb-1 border-b border-onyx-200">Publications</h4>
                        <ul className="text-[9px] lg:text-[10px] text-onyx-800 space-y-2 mt-2 list-none">
                          <li className="pl-4 -indent-4">
                            <strong>Jenkins, S.</strong>, & Smith, R. (2022). <span className="italic">"Eye-tracking analysis of brutalist web interfaces."</span> Journal of Human-Computer Interaction, 45(3), 112-128.
                          </li>
                          <li className="pl-4 -indent-4">
                            <strong>Jenkins, S.</strong> (2021). <span className="italic">"Data density in professional documentation."</span> Cognitive Design Quarterly, 12(1), 45-60.
                          </li>
                        </ul>
                      </div>
                      
                      {/* Tooltip Anchor: Academic formatting */}
                      <motion.div variants={tooltipVariants} className="absolute top-[60%] left-[102%] flex items-center w-48 lg:w-64 hidden md:flex z-30">
                        <div className="w-12 h-[1px] bg-slate-600 shrink-0"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700 -ml-1 border border-white shrink-0 shadow-sm"></div>
                        <div className="ml-3 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl shadow-xl border border-onyx-200 text-left relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-slate-700"></div>
                          <div className="flex items-center gap-2 text-slate-700 mb-1.5">
                            <CheckCircle size={14} /> <span className="font-bold text-[9px] tracking-widest uppercase">Academic Standard</span>
                          </div>
                          <p className="text-[10px] lg:text-xs text-onyx-600 leading-relaxed">Hanging indents and strict serif hierarchies comply with CV standards for peer review.</p>
                        </div>
                      </motion.div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
            
            {/* RIGHT SPACER for centering logic when tooltips are hidden on small screens */}
            <div className="hidden lg:block w-1/4 max-w-sm shrink-0 relative z-0"></div>

          </motion.div>
        </AnimatePresence>
      </div>
      
    </section>
  );
}
