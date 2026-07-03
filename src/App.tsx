import { useState, useRef } from 'react';
import { FileText, Download, Layout, CheckCircle, Shield, FileOutput, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { useResumeStore } from './store/useResumeStore';
import AnatomySection from './components/AnatomySection';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [mode, setMode] = useState<'landing' | 'builder'>('landing');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [activeModal, setActiveModal] = useState<'none' | 'about' | 'privacy'>('none');

  // Hooks must be called before conditional returns
  const { resumeData } = useResumeStore();
  const printRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: resumeData.basics.name ? `${resumeData.basics.name.replace(/\s+/g, '_')}_Resume` : 'Resume',
  });

  const renderModal = () => {
    if (activeModal === 'none') return null;
    
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border-2 border-slate-900 shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden flex flex-col"
        >
          <div className="px-6 py-4 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-serif font-bold text-xl text-slate-950">
              {activeModal === 'about' ? 'About Resumark' : 'Privacy Policy'}
            </h2>
            <button onClick={() => setActiveModal('none')} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors text-slate-900">
              <X size={16} strokeWidth={3} />
            </button>
          </div>
          <div className="p-6 text-sm text-slate-600 font-medium leading-relaxed max-h-[60vh] overflow-y-auto">
            {activeModal === 'about' ? (
              <div className="space-y-4">
                <p>Resumark is a brutalist, privacy-first resume builder designed for the modern job market. We believe that your career data belongs to you, which is why everything runs strictly on your local device.</p>
                <p>Our templates are rigorously tested against modern Applicant Tracking Systems (ATS) to ensure 100% parsing accuracy while maintaining a premium, high-contrast visual hierarchy.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p><strong>1. Zero Data Collection:</strong> Resumark does not collect, transmit, or store your resume data on any external servers. All information you enter remains entirely within your local browser storage.</p>
                <p><strong>2. Local Processing:</strong> Document generation (both PDF and DOCX) is processed locally on your machine. We do not use third-party APIs to process your data.</p>
                <p><strong>3. Analytics:</strong> We do not track individual user behavior or deploy invasive analytics cookies. Your privacy is a core design principle, not an afterthought.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  if (mode === 'landing') {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 relative overflow-hidden">
        <AnimatePresence>
          {renderModal()}
        </AnimatePresence>

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
              <a href="#templates" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">Templates</a>
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
            
            {/* Catchy Tagline / Quote Centered in Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-10 lg:top-24 left-1/2 -translate-x-[80%] w-full max-w-[400px] z-30 pointer-events-none hidden lg:block"
            >
              <div className="text-center">
                <div className="text-slate-950 font-bold font-yuyu text-3xl lg:text-4xl leading-tight mb-3">&quot;Stop fighting with formatting. Start landing interviews.&quot;</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-slate-300"></span> The Resumark Promise <span className="w-8 h-px bg-slate-300"></span>
                </div>
              </div>
            </motion.div>

            {/* Left Content */}
            <div className="flex-1 text-left z-20 pt-12 lg:pt-0 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full border-2 border-black bg-black text-white font-bold text-xs tracking-widest uppercase mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  100% Free, No Signup
                </div>
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
                <span className="flex items-center gap-2"><Download size={16} className="text-slate-900"/> PDF Export</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-slate-900"/> ATS Optimized</span>
              </motion.div>
            </div>

            {/* Right Content: 3D Floating Cluster */}
            <div className="flex-1 w-full relative h-[400px] lg:h-[600px] perspective-[2000px] z-10 flex items-center justify-center pointer-events-none mt-12 lg:-mt-32 xl:-mt-48">
               {/* Dot grid pattern to fill empty space */}
               <div className="absolute -top-10 -right-10 lg:-top-10 lg:right-0 w-64 h-64 lg:w-96 lg:h-96 opacity-10" style={{ backgroundImage: "radial-gradient(#0f172a 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
               
               {/* Decorative giant text */}
               <div className="absolute -top-10 lg:top-0 left-1/2 -translate-x-1/2 text-[12rem] lg:text-[18rem] font-serif font-black text-slate-200/50 tracking-tighter leading-none select-none z-0">
                 CV.
               </div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-300 rounded-full blur-[100px] opacity-60"></div>
               
               {/* Resume 1 */}
               <motion.div 
                 animate={{ y: [-10, 10, -10], rotateZ: [10, 12, 10] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute right-0 lg:-right-10 top-10 w-[240px] h-[340px] bg-white rounded-xl shadow-2xl border border-slate-200 p-4 transform-style-3d opacity-80 hidden sm:block"
                 style={{ rotateX: 15, rotateY: -20, translateZ: -100 }}
               >
                 <div className="border-b-4 border-slate-900 pb-2 mb-2"><div className="h-4 w-3/4 bg-slate-900"></div></div>
                 <div className="space-y-2 mt-4"><div className="h-2 w-full bg-slate-200"></div><div className="h-2 w-5/6 bg-slate-200"></div></div>
               </motion.div>

               {/* Resume 2 */}
               <motion.div 
                 animate={{ y: [10, -10, 10], rotateZ: [-15, -12, -15] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute left-0 lg:-left-10 bottom-10 w-[240px] h-[340px] bg-white rounded-xl shadow-2xl border border-slate-200 p-0 overflow-hidden transform-style-3d flex hidden sm:flex"
                 style={{ rotateX: 20, rotateY: 25, translateZ: -50 }}
               >
                 <div className="w-1/3 bg-slate-900 h-full p-2"><div className="h-4 w-full bg-slate-700 mb-4"></div></div>
                 <div className="w-2/3 bg-white h-full p-4 space-y-2"><div className="h-2 w-full bg-slate-200"></div></div>
               </motion.div>

               {/* Resume 3 (Main) */}
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
                  { step: '03', title: 'Export Free', desc: 'Download a high-resolution, pixel-perfect PDF.' }
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
          <section className="py-32 px-6 max-w-7xl mx-auto text-center relative z-10" id="templates">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-slate-950">Purpose-Built Archetypes</h2>
            <p className="text-slate-600 mb-16 text-lg max-w-2xl mx-auto font-medium">Stand out with brutalist, high-contrast designs that parse perfectly in ATS systems and guide human eyes to your biggest impacts.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'ATS Standard', desc: 'Guaranteed 100% machine parsing logic.', type: 'ats' },
                { name: 'Modern Minimalist', desc: 'Sleek, forward-thinking layout.', type: 'modern' },
                { name: 'Executive', desc: 'Conservative, two-column header.', type: 'executive' },
                { name: 'Creative Block', desc: 'Bold visual hierarchy for creatives.', type: 'creative' },
                { name: 'Tech Pro', desc: 'Developer-focused typography.', type: 'tech' },
                { name: 'Classic Professional', desc: 'Traditional structured serif design.', type: 'classic' },
                { name: 'Academic CV', desc: 'High density single column.', type: 'academic' },
                { name: 'Startup Modern', desc: 'Clean lines with subtle borders.', type: 'startup' },
                { name: 'Designer Portfolio', desc: 'Deep dark mode for creatives.', type: 'designer' }
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative aspect-[1/1.2] bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden cursor-pointer hover:border-slate-400 transition-all shadow-sm hover:shadow-xl flex flex-col items-center justify-center" 
                  onClick={() => setMode('builder')}
                >
                  {/* Dummy Page Background */}
                  <div className="absolute inset-x-8 -top-6 bottom-16 md:inset-x-12 md:-top-4 md:bottom-20 z-0 opacity-80 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none drop-shadow-md">
                    {t.type === 'designer' ? (
                      <div className="w-full h-full bg-slate-900 rounded-md shadow-xl p-4 flex flex-col border border-slate-800">
                        <div className="w-2/3 h-4 bg-slate-700 rounded-sm mb-1"></div>
                        <div className="w-1/3 h-1 bg-brand-500 mb-6"></div>
                        <div className="flex gap-4 flex-1">
                          <div className="w-1/3 border-r border-slate-700 space-y-2 pr-2">
                            <div className="w-full h-1.5 bg-slate-600 rounded-sm"></div>
                            <div className="w-4/5 h-1.5 bg-slate-600 rounded-sm"></div>
                          </div>
                          <div className="w-2/3 space-y-3">
                            <div>
                              <div className="w-1/2 h-2 bg-slate-600 rounded-sm mb-2"></div>
                              <div className="w-full h-1 bg-slate-700 rounded-sm mb-1"></div>
                              <div className="w-5/6 h-1 bg-slate-700 rounded-sm"></div>
                            </div>
                            <div>
                              <div className="w-1/2 h-2 bg-slate-600 rounded-sm mb-2"></div>
                              <div className="w-full h-1 bg-slate-700 rounded-sm mb-1"></div>
                              <div className="w-4/5 h-1 bg-slate-700 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white rounded-md shadow-xl p-4 flex flex-col border border-slate-200">
                        <div className={`h-4 bg-slate-300 rounded-sm mb-2 ${t.type === 'ats' || t.type === 'classic' || t.type === 'academic' ? 'w-2/3 mx-auto' : 'w-2/3'}`}></div>
                        <div className={`h-1.5 bg-slate-200 rounded-sm mb-6 ${t.type === 'ats' || t.type === 'classic' || t.type === 'academic' ? 'w-1/3 mx-auto' : 'w-1/4'}`}></div>
                        
                        {t.type === 'executive' || t.type === 'creative' ? (
                          <div className="flex gap-4 flex-1">
                            <div className="w-1/3 space-y-2">
                              <div className="w-full h-1.5 bg-slate-300 rounded-sm"></div>
                              <div className="w-4/5 h-1.5 bg-slate-200 rounded-sm"></div>
                            </div>
                            <div className="w-2/3 space-y-3">
                              <div>
                                <div className="w-1/3 h-2 bg-slate-300 rounded-sm mb-2"></div>
                                <div className="w-full h-1.5 bg-slate-200 rounded-sm mb-1"></div>
                                <div className="w-5/6 h-1.5 bg-slate-200 rounded-sm mb-1"></div>
                                <div className="w-full h-1.5 bg-slate-200 rounded-sm"></div>
                              </div>
                              <div>
                                <div className="w-1/3 h-2 bg-slate-300 rounded-sm mb-2"></div>
                                <div className="w-full h-1.5 bg-slate-200 rounded-sm mb-1"></div>
                                <div className="w-4/5 h-1.5 bg-slate-200 rounded-sm"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 space-y-4">
                            <div>
                              <div className="w-1/4 h-2 bg-slate-300 rounded-sm mb-2"></div>
                              <div className="w-full h-1 bg-slate-200 rounded-sm mb-1"></div>
                              <div className="w-5/6 h-1 bg-slate-200 rounded-sm mb-1"></div>
                              <div className="w-full h-1 bg-slate-200 rounded-sm"></div>
                            </div>
                            <div>
                              <div className="w-1/4 h-2 bg-slate-300 rounded-sm mb-2"></div>
                              <div className="w-full h-1 bg-slate-200 rounded-sm mb-1"></div>
                              <div className="w-4/5 h-1 bg-slate-200 rounded-sm"></div>
                            </div>
                            <div>
                              <div className="w-1/4 h-2 bg-slate-300 rounded-sm mb-2"></div>
                              <div className="w-full h-1 bg-slate-200 rounded-sm mb-1"></div>
                              <div className="w-full h-1 bg-slate-200 rounded-sm"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 p-6 flex flex-col items-center justify-end h-full w-full bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform"><FileText size={24}/></div>
                    <div className="pt-24 w-full">
                      <h3 className="font-bold text-xl lg:text-2xl mb-2 text-slate-950">{t.name}</h3>
                      <p className="text-xs lg:text-sm text-slate-600 font-medium">{t.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

            <footer className="border-slate-200 border-t bg-white mt-auto relative z-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm text-slate-600">
                <div>
                    <h3 className="font-bold mb-4 text-blue-600 hover:text-blue-800">Resumark</h3>
                    <p className="opacity-70">Empowering professionals with top-tier tools.</p>
                </div>
                <div>
                    <h3 className="font-bold mb-4 text-blue-600 hover:text-blue-800">Tools</h3>
                    <ul className="space-y-2 opacity-70">
                        <li><a href="/" className="hover:text-blue-600 hover:text-blue-800">Home</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4 text-blue-600 hover:text-blue-800">Company</h3>
                    <ul className="space-y-2 opacity-70">
                        <li><a href="/about.html" className="hover:text-blue-600 hover:text-blue-800">About Us</a></li>
                        <li><a href="/contact.html" className="hover:text-blue-600 hover:text-blue-800">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4 text-blue-600 hover:text-blue-800">Legal &amp; Compliance</h3>
                    <ul className="space-y-2 opacity-70">
                        <li><a href="/privacy-policy.html" className="hover:text-blue-600 hover:text-blue-800">Privacy Policy</a></li>
                        <li><a href="/terms-of-service.html" className="hover:text-blue-600 hover:text-blue-800">Terms of Service</a></li>
                        <li><a href="/disclaimer.html" className="hover:text-blue-600 hover:text-blue-800 font-bold">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-200 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 opacity-70 text-xs font-semibold">
                <p>&copy; 2026 Resumark. All rights reserved.</p>
                <p className="mt-4 md:mt-0">Resumark does not guarantee employment outcomes. Resume content and accuracy are the sole responsibility of the user.</p>
            </div>
        </div>
    </footer>
      </div>
    );
  }

  // BUILDER WORKSPACE OVERHAUL (Muted Industrial / Brutalist)
  return (
    <div className="min-h-screen h-[100dvh] flex flex-col font-sans overflow-hidden bg-slate-50">
      {/* Stark White Header */}
      <header className="px-4 md:px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center z-20 shrink-0">
        <div className="flex items-center gap-2 md:gap-3" onClick={() => setMode('landing')} style={{cursor: 'pointer'}}>
          <div className="w-8 h-8 bg-slate-950 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg shadow-glow">
            R
          </div>
          <span className="text-lg md:text-xl font-bold font-serif tracking-tight text-slate-950 hidden sm:block">Resumark</span>
        </div>
        
        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden bg-slate-100 p-1 rounded-full border border-slate-200 mx-2">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${activeTab === 'editor' ? 'bg-white shadow-sm text-slate-950' : 'text-slate-500'}`}
          >
            Edit
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${activeTab === 'preview' ? 'bg-white shadow-sm text-slate-950' : 'text-slate-500'}`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handlePrint}
            className="px-4 md:px-8 py-3 text-xs font-bold uppercase tracking-widest bg-slate-950 text-white rounded-full hover:bg-black transition-colors shadow-lg flex items-center gap-2"
          >
            <FileOutput size={16} /> <span className="hidden sm:block">Export PDF</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Editor Sidebar */}
        <aside className={`${activeTab === 'editor' ? 'block' : 'hidden'} lg:block w-full lg:w-[45%] h-full overflow-y-auto border-r border-slate-200 p-4 sm:p-6 xl:p-8 bg-slate-50 custom-scrollbar absolute lg:relative z-10`}>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-950 mb-8 flex items-center gap-2 border-b border-slate-200 pb-4">
            <Layout size={18} /> Edit Content
          </h2>
          <Editor />
        </aside>
        
        {/* Live Preview Canvas */}
        <main className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[55%] h-full bg-slate-200/60 p-2 sm:p-8 xl:p-12 overflow-y-auto justify-center items-start custom-scrollbar absolute lg:relative z-0`}>
          <div ref={printRef} className="w-full max-w-[850px]">
            <Preview />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
