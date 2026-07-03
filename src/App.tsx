import { useState, useRef } from 'react';
import { FileText, Download, Layout, CheckCircle, Shield, FileOutput } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { useResumeStore } from './store/useResumeStore';
import { generateDocx } from './lib/docxExport';

import AnatomySection from './components/AnatomySection';
import { motion } from 'framer-motion';

function App() {
  const [mode, setMode] = useState<'landing' | 'builder'>('landing');

  // Hooks must be called before conditional returns
  const { resumeData } = useResumeStore();
  const printRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: resumeData.basics.name ? `${resumeData.basics.name.replace(/\s+/g, '_')}_Resume` : 'Resume',
  });

  if (mode === 'landing') {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 relative overflow-hidden">
        {/* Floating Glassmorphic Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
          <header className="px-6 py-4 border border-slate-200/50 flex justify-between items-center bg-white/70 backdrop-blur-md rounded-full shadow-lg pointer-events-auto w-full max-w-6xl transition-all">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-950 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-glow">
                R
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-slate-950">Resumark</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#templates" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">Templates</a>
              <a href="#templates" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">ATS Guide</a>
              <button 
                onClick={() => setMode('builder')}
                className="px-6 py-2.5 bg-slate-950 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-md text-sm"
              >
                Build Resume Free
              </button>
            </nav>
          </header>
        </div>

        <main className="flex-1 pt-32">
          {/* Overhauled Hero Section: Split Layout with 3D Cluster to remove empty space */}
          <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 overflow-visible">
            
            {/* Left Content */}
            <div className="flex-1 text-left z-20 pt-12 lg:pt-0 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-slate-200/60 border border-slate-300 text-slate-800 font-bold text-xs rounded-full mb-6 uppercase tracking-widest"
              >
                Design System Powered
              </motion.div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight mb-6 text-slate-950 leading-[1.05]"
              >
                Your career. <span className="text-slate-500 italic font-medium">Your data.</span><br/>Pixel-perfect<br/>resumes.
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg md:text-xl text-slate-600 max-w-lg mb-10 font-medium leading-relaxed"
              >
                Build stunning, ATS-friendly resumes entirely in your browser using brutalist design principles. 
                No accounts, no tracking, no friction.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode('builder')}
                  className="px-8 py-4 bg-slate-950 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-2xl flex items-center gap-2"
                >
                  <FileText size={20} />
                  Start Building Now
                </motion.button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-6 text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider"
              >
                <span className="flex items-center gap-2"><Shield size={16} className="text-slate-900"/> 100% Privacy</span>
                <span className="flex items-center gap-2"><Download size={16} className="text-slate-900"/> PDF & DOCX</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-slate-900"/> ATS Optimized</span>
              </motion.div>
            </div>

            {/* Right Content: 3D Floating Cluster to fill space */}
            <div className="flex-1 w-full relative h-[400px] lg:h-[600px] perspective-[2000px] z-10 flex items-center justify-center pointer-events-none mt-12 lg:mt-0">
               {/* Background blur orb */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-300 rounded-full blur-[100px] opacity-60"></div>
               
               {/* Resume 1: Executive (Back Right) */}
               <motion.div 
                 animate={{ y: [-10, 10, -10], rotateZ: [10, 12, 10] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute right-0 lg:-right-10 top-10 w-[240px] h-[340px] bg-white rounded-xl shadow-2xl border border-slate-200 p-4 transform-style-3d opacity-80"
                 style={{ rotateX: 15, rotateY: -20, translateZ: -100 }}
               >
                 <div className="border-b-4 border-slate-900 pb-2 mb-2"><div className="h-4 w-3/4 bg-slate-900"></div></div>
                 <div className="space-y-2 mt-4"><div className="h-2 w-full bg-slate-200"></div><div className="h-2 w-5/6 bg-slate-200"></div></div>
               </motion.div>

               {/* Resume 2: Creative (Back Left) */}
               <motion.div 
                 animate={{ y: [10, -10, 10], rotateZ: [-15, -12, -15] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute left-0 lg:-left-10 bottom-10 w-[240px] h-[340px] bg-white rounded-xl shadow-2xl border border-slate-200 p-0 overflow-hidden transform-style-3d flex"
                 style={{ rotateX: 20, rotateY: 25, translateZ: -50 }}
               >
                 <div className="w-1/3 bg-slate-900 h-full p-2"><div className="h-4 w-full bg-slate-700 mb-4"></div></div>
                 <div className="w-2/3 bg-white h-full p-4 space-y-2"><div className="h-2 w-full bg-slate-200"></div></div>
               </motion.div>

               {/* Resume 3: ATS Standard (Front Center) */}
               <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[320px] h-[400px] lg:h-[450px] bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 border-slate-100 p-6 transform-style-3d z-20 flex flex-col"
                 style={{ rotateX: 5, rotateY: -5, translateZ: 50 }}
               >
                 <div className="border-b-2 border-slate-800 pb-3 text-center mb-4">
                   <div className="h-5 w-2/3 bg-slate-900 mx-auto mb-2"></div>
                   <div className="h-2 w-1/2 bg-slate-400 mx-auto"></div>
                 </div>
                 <div className="space-y-4 flex-1">
                   <div>
                     <div className="h-2 w-1/4 bg-slate-800 mb-2"></div>
                     <div className="space-y-1.5"><div className="h-1.5 w-full bg-slate-200"></div><div className="h-1.5 w-5/6 bg-slate-200"></div></div>
                   </div>
                   <div>
                     <div className="h-2 w-1/4 bg-slate-800 mb-2"></div>
                     <div className="space-y-1.5"><div className="h-1.5 w-full bg-slate-200"></div><div className="h-1.5 w-full bg-slate-200"></div></div>
                   </div>
                   <div>
                     <div className="h-2 w-1/4 bg-slate-800 mb-2"></div>
                     <div className="space-y-1.5"><div className="h-1.5 w-full bg-slate-200"></div></div>
                   </div>
                 </div>
               </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white py-24 px-6 relative z-10 border-y border-slate-200">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-16 text-slate-950">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: '01', title: 'Local Privacy', desc: 'Your data never leaves your device. Auto-saved locally in your browser.' },
                  { step: '02', title: 'Smart Design', desc: 'Switch between premium, eye-tracking optimized archetypes instantly.' },
                  { step: '03', title: 'Export Free', desc: 'Download a pixel-perfect PDF or a fully editable DOCX file.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-300 transition-colors text-left"
                  >
                    <div className="text-3xl font-black text-slate-300 mb-4 font-serif">{item.step}</div>
                    <h3 className="font-bold text-xl mb-3 text-slate-950">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <AnatomySection />

          {/* Template Gallery */}
          <section className="py-32 px-6 max-w-6xl mx-auto text-center relative z-10" id="templates">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-slate-950">Purpose-Built Archetypes</h2>
            <p className="text-slate-600 mb-16 text-lg max-w-2xl mx-auto font-medium">Stand out with brutalist, high-contrast designs that parse perfectly in ATS systems and guide human eyes to your biggest impacts.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'ATS Standard', desc: 'Guaranteed 100% parsing logic.' },
                { name: 'Executive', desc: 'For senior leadership roles.' },
                { name: 'Creative', desc: 'Bold visual hierarchy.' }
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="aspect-[1/1.2] bg-slate-50 border-2 border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-slate-950 transition-all" 
                  onClick={() => setMode('builder')}
                >
                  <div className="w-16 h-16 bg-slate-950 text-white rounded-full flex items-center justify-center mb-6"><FileText size={24}/></div>
                  <h3 className="font-bold text-2xl mb-3 text-slate-950">{t.name}</h3>
                  <p className="text-sm text-slate-600 font-medium">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-slate-950 text-slate-400 py-12 px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 bg-white text-slate-950 rounded-full flex items-center justify-center font-serif font-bold text-xs">
                R
              </div>
              <span className="font-serif font-bold tracking-tight">Resumark</span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/#about" className="hover:text-white transition">About</a>
              <a href="/#privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
            </div>
            <p className="text-xs">&copy; 2026 Resumark. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // BUILDER WORKSPACE OVERHAUL (Muted Industrial / Brutalist)
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Stark White Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center z-10">
        <div className="flex items-center gap-3" onClick={() => setMode('landing')} style={{cursor: 'pointer'}}>
          <div className="w-8 h-8 bg-slate-950 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
            R
          </div>
          <span className="text-xl font-bold font-serif tracking-tight text-slate-950">Resumark</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => generateDocx(resumeData)}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Export DOCX
          </button>
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-slate-950 text-white rounded-full hover:bg-black transition-colors shadow-lg flex items-center gap-2"
          >
            <FileOutput size={16} /> Export PDF
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar: Muted Slate-50 */}
        <aside className="w-full lg:w-[45%] h-full overflow-y-auto border-r border-slate-200 p-6 xl:p-8 bg-slate-50 custom-scrollbar">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-950 mb-8 flex items-center gap-2 border-b border-slate-200 pb-4">
            <Layout size={18} /> Edit Content
          </h2>
          <Editor />
        </aside>
        
        {/* Live Preview: Deep Industrial Grey */}
        <main className="hidden lg:flex w-full lg:w-[55%] h-full bg-slate-200/60 p-8 xl:p-12 overflow-y-auto justify-center items-start custom-scrollbar">
          <div ref={printRef} className="w-full max-w-[850px]">
            <Preview />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
