import { useState, useRef } from 'react';
import { FileText, Download, Layout, CheckCircle, Shield } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col font-sans bg-onyx-50 relative overflow-hidden">
        {/* Floating Glassmorphic Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
          <header className="px-6 py-4 border border-onyx-200/50 flex justify-between items-center bg-white/70 backdrop-blur-md rounded-full shadow-lg pointer-events-auto w-full max-w-5xl transition-all">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-glow">
                R
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-onyx-900">Resumark</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#templates" className="text-sm font-semibold text-onyx-700 hover:text-brand-600 transition-colors">Templates</a>
              <a href="#templates" className="text-sm font-semibold text-onyx-700 hover:text-brand-600 transition-colors">ATS Guide</a>
              <button 
                onClick={() => setMode('builder')}
                className="px-5 py-2 bg-onyx-900 text-white rounded-full font-semibold hover:bg-onyx-800 transition-colors shadow-md"
              >
                Build Resume Free
              </button>
            </nav>
          </header>
        </div>

        <main className="flex-1 pt-32">
          {/* Hero Section */}
          <section className="relative max-w-5xl mx-auto px-6 py-24 text-center overflow-visible perspective-[1000px]">
            {/* Glowing 3D grid background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ rotateX: 60, y: 50, opacity: 0 }}
                animate={{ rotateX: 60, y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-[150%] h-[150%] bg-[linear-gradient(to_right,#cbd5e144_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e144_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
              ></motion.div>
            </div>
            
            <div className="relative z-10">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 text-onyx-900 leading-tight"
              >
                Your career. <span className="text-brand-600 drop-shadow-sm">Your data.</span><br/>Pixel-perfect resumes.
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl text-onyx-500 max-w-2xl mx-auto mb-10"
              >
                Build stunning, ATS-friendly resumes entirely in your browser. 
                No accounts, no server tracking, no lost data.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMode('builder')}
                  className="px-8 py-4 bg-brand-600/90 backdrop-blur-md text-white rounded-2xl font-bold text-lg hover:bg-brand-600 transition-colors shadow-xl shadow-brand-500/20 border border-brand-400/30 flex items-center gap-2 mx-auto"
                >
                  <FileText size={20} />
                  Start Building Now
                </motion.button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center justify-center gap-6 text-sm text-onyx-500 font-medium"
              >
                <span className="flex items-center gap-1.5"><Shield size={16} className="text-brand-600"/> 100% Privacy</span>
                <span className="flex items-center gap-1.5"><Download size={16} className="text-brand-600"/> Free PDF & DOCX</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-brand-600"/> ATS Optimized</span>
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-onyx-50/80 py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-onyx-900">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
                {[
                  { step: 1, title: 'Fill your details', desc: 'Your data never leaves your device. Auto-saved locally in your browser.' },
                  { step: 2, title: 'Choose a template', desc: 'Switch between 5 premium, eye-tracking optimized designs instantly.' },
                  { step: 3, title: 'Export for free', desc: 'Download a pixel-perfect PDF or a fully editable DOCX file.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                    className="p-8 bg-white/70 backdrop-blur-lg rounded-2xl border border-onyx-200/50 shadow-lg hover:shadow-xl hover:border-brand-200 transition-all"
                  >
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-sm border border-brand-100">{item.step}</div>
                    <h3 className="font-bold text-lg mb-3 text-onyx-900">{item.title}</h3>
                    <p className="text-sm text-onyx-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <AnatomySection />

          {/* Template Gallery */}
          <section className="py-32 px-6 max-w-5xl mx-auto text-center relative z-10" id="templates">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-onyx-900">Premium Templates</h2>
            <p className="text-onyx-500 mb-16 text-lg max-w-2xl mx-auto">Stand out with designs that parse perfectly in ATS systems and guide human eyes to your biggest impacts.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
              {[
                { name: 'ATS Standard', desc: 'Guaranteed parsing logic.' },
                { name: 'Executive', desc: 'For senior leadership roles.' },
                { name: 'Tech Pro', desc: 'Code-first aesthetic.' }
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ rotateX: 10, rotateY: -15, rotateZ: 2, scale: 1.05 }}
                  className="aspect-[1/1.4] bg-white/80 backdrop-blur-md border border-onyx-200/50 shadow-xl rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden group hover:shadow-brand-500/20 hover:border-brand-300 transition-colors" 
                  onClick={() => setMode('builder')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-brand-50 text-brand-600 border border-brand-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><FileText size={24}/></div>
                  <h3 className="font-bold text-xl mb-3 relative z-10 text-onyx-900">{t.name}</h3>
                  <p className="text-sm text-onyx-500 relative z-10">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-onyx-900 text-onyx-400 py-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-white font-serif font-bold text-xs">
                R
              </div>
              <span className="font-serif font-bold text-onyx-50">Resumark</span>
            </div>
            <div className="flex gap-6 text-sm">
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



  return (
    <div className="min-h-screen flex flex-col bg-onyx-50 dark:bg-onyx-950">
      <header className="px-6 py-4 bg-white dark:bg-onyx-900 border-b border-onyx-200 dark:border-onyx-800 flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-2" onClick={() => setMode('landing')} style={{cursor: 'pointer'}}>
          <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center text-white font-serif font-bold text-lg shadow-glow">
            R
          </div>
          <span className="text-xl font-bold font-serif tracking-tight">Resumark</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => generateDocx(resumeData)}
            className="px-5 py-2 text-sm font-bold text-onyx-700 dark:text-onyx-200 border border-onyx-300 dark:border-onyx-700 rounded-lg hover:bg-onyx-100 dark:hover:bg-onyx-800 transition shadow-sm"
          >
            Export DOCX
          </button>
          <button 
            onClick={handlePrint}
            className="px-5 py-2 text-sm font-bold bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition shadow-glow flex items-center gap-2"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-full lg:w-[45%] overflow-y-auto border-r border-onyx-200 dark:border-onyx-800 p-6 xl:p-8 bg-onyx-50/50 dark:bg-onyx-950">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
            <Layout size={24} className="text-brand-600" /> Resume Content
          </h2>
          <Editor />
        </aside>
        
        {/* Live Preview */}
        <main className="hidden lg:flex w-full lg:w-[55%] bg-onyx-200/50 dark:bg-onyx-900 p-8 xl:p-12 overflow-y-auto justify-center items-start">
          <div ref={printRef} className="w-full max-w-[850px]">
            <Preview />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
