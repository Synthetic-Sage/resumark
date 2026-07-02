import { useState, useRef } from 'react';
import { FileText, Download, Layout, CheckCircle, Shield } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { useResumeStore } from './store/useResumeStore';
import { generateDocx } from './lib/docxExport';

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
      <div className="min-h-screen flex flex-col font-sans">
        <header className="px-6 py-6 border-b border-onyx-200 dark:border-onyx-800 flex justify-between items-center bg-white dark:bg-onyx-900 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center text-white font-serif font-bold text-xl">
              R
            </div>
            <span className="text-xl font-bold font-serif tracking-tight">Resumark</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#templates" className="text-sm font-semibold hover:text-brand-600 transition-colors">Templates</a>
            <a href="#templates" className="text-sm font-semibold hover:text-brand-600 transition-colors">ATS Guide</a>
            <button 
              onClick={() => setMode('builder')}
              className="px-5 py-2 bg-onyx-900 dark:bg-brand-600 text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Build Resume Free
            </button>
          </nav>
        </header>

        <main className="flex-1">
          <section className="max-w-5xl mx-auto px-6 py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 text-onyx-900 dark:text-onyx-50 leading-tight">
              Your career. <span className="text-brand-600">Your data.</span><br/>Pixel-perfect resumes.
            </h1>
            <p className="text-xl text-onyx-500 dark:text-onyx-300 max-w-2xl mx-auto mb-10">
              Build stunning, ATS-friendly resumes entirely in your browser. 
              No accounts, no server tracking, no lost data.
            </p>
            <button 
              onClick={() => setMode('builder')}
              className="px-8 py-4 bg-brand-600 text-white rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors shadow-glow flex items-center gap-2 mx-auto"
            >
              <FileText size={20} />
              Start Building Now
            </button>
            
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-onyx-500 font-medium">
              <span className="flex items-center gap-1"><Shield size={16} className="text-brand-600"/> 100% Privacy</span>
              <span className="flex items-center gap-1"><Download size={16} className="text-brand-600"/> Free PDF & DOCX</span>
              <span className="flex items-center gap-1"><CheckCircle size={16} className="text-brand-600"/> ATS Optimized</span>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white dark:bg-onyx-950 py-20 px-6 border-y border-onyx-200 dark:border-onyx-800">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-12">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-onyx-50 dark:bg-onyx-900 rounded-xl">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 text-brand-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                  <h3 className="font-bold mb-2">Fill your details</h3>
                  <p className="text-sm text-onyx-500">Your data never leaves your device. Auto-saved locally.</p>
                </div>
                <div className="p-6 bg-onyx-50 dark:bg-onyx-900 rounded-xl">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 text-brand-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                  <h3 className="font-bold mb-2">Choose a template</h3>
                  <p className="text-sm text-onyx-500">Switch between 5 premium, ATS-friendly designs instantly.</p>
                </div>
                <div className="p-6 bg-onyx-50 dark:bg-onyx-900 rounded-xl">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 text-brand-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                  <h3 className="font-bold mb-2">Export for free</h3>
                  <p className="text-sm text-onyx-500">Download a pixel-perfect PDF or an editable DOCX file.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Template Gallery */}
          <section className="py-20 px-6 max-w-5xl mx-auto text-center" id="templates">
            <h2 className="text-3xl font-serif font-bold mb-4">Premium Templates</h2>
            <p className="text-onyx-500 mb-10">Stand out with designs that parse perfectly in ATS systems.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'ATS Standard', desc: 'Guaranteed parsing logic.' },
                { name: 'Executive', desc: 'For senior leadership roles.' },
                { name: 'Tech Pro', desc: 'Code-first aesthetic.' }
              ].map((t, i) => (
                <div key={i} className="aspect-[1/1.2] bg-onyx-50 dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 shadow-sm rounded-lg flex flex-col items-center justify-center p-6 text-center hover:shadow-glow transition-shadow cursor-pointer" onClick={() => setMode('builder')}>
                  <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4"><FileText size={24}/></div>
                  <h3 className="font-bold text-lg mb-2">{t.name}</h3>
                  <p className="text-sm text-onyx-500">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-onyx-900 dark:bg-onyx-950 text-onyx-400 py-12 px-6">
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
