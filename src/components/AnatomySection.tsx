import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, BrainCircuit, Search, MousePointerClick } from 'lucide-react';

export default function AnatomySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical staggered spacing for the exploded view (2.5D stack)
  const yHeader = useTransform(scrollYProgress, [0.3, 0.6], [0, -120]);
  const ySummary = useTransform(scrollYProgress, [0.3, 0.6], [0, -40]);
  const yExperience = useTransform(scrollYProgress, [0.3, 0.6], [0, 40]);
  const ySkills = useTransform(scrollYProgress, [0.3, 0.6], [0, 120]);

  // Labels fade in as it explodes
  const opacityLabels = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const xLabelsRight = useTransform(scrollYProgress, [0.4, 0.6], [-20, 0]);
  const xLabelsLeft = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  // Gentle continuous float
  const floatAnimation: any = {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[140vh] bg-onyx-50/50 overflow-hidden flex flex-col items-center pt-32 pb-24 border-y border-onyx-200"
    >
      <div className="text-center z-10 mb-24 max-w-3xl px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-onyx-900 mb-6">The Anatomy of a Perfect Resume</h2>
        <p className="text-lg text-onyx-500">
          We didn't just design templates. We engineered them based on eye-tracking science and ATS parsing algorithms. 
          Scroll down to see exactly how a modern resume is digested.
        </p>
      </div>

      <div className="sticky top-1/4 w-full max-w-5xl mx-auto h-[60vh] hidden md:flex items-center justify-center">
        
        {/* Central 2.5D Stack */}
        <motion.div 
          className="relative w-full max-w-xl perspective-[1000px]"
          animate={floatAnimation}
        >
          {/* Base Shadow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 w-3/4 h-12 bg-onyx-200/50 rounded-[100%] blur-2xl"></div>

          {/* Header Layer */}
          <motion.div 
            style={{ y: yHeader, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-0 left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-8 shadow-xl z-40 transition-colors hover:border-brand-300"
          >
            <div className="h-5 w-3/4 bg-brand-100 rounded-md mb-4"></div>
            <div className="h-3 w-1/2 bg-onyx-100 rounded-md"></div>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsRight }} className="absolute top-1/2 left-[105%] flex items-center w-72">
              <div className="w-16 h-[2px] bg-brand-200 shrink-0"></div>
              <div className="w-3 h-3 rounded-full bg-brand-500 -ml-2 border-2 border-white shrink-0 z-10"></div>
              <div className="ml-4 bg-white p-4 rounded-lg shadow-lg border border-onyx-100">
                <div className="flex items-center gap-2 text-brand-600 mb-2">
                  <Eye size={18} /> <span className="font-bold text-xs tracking-widest uppercase">The F-Pattern</span>
                </div>
                <p className="text-sm text-onyx-600 leading-relaxed">Recruiters anchor top-left. Our headers ensure your name and title are instantly processed.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Summary Layer */}
          <motion.div 
            style={{ y: ySummary, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-16 left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-8 shadow-lg z-30 transition-colors hover:border-blue-300"
          >
            <div className="h-3 w-full bg-onyx-100 rounded-md mb-3"></div>
            <div className="h-3 w-5/6 bg-onyx-100 rounded-md mb-3"></div>
            <div className="h-3 w-4/6 bg-onyx-100 rounded-md"></div>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsLeft }} className="absolute top-1/2 right-[105%] flex items-center justify-end w-72">
              <div className="mr-4 bg-white p-4 rounded-lg shadow-lg border border-onyx-100 text-right">
                <div className="flex items-center justify-end gap-2 text-blue-600 mb-2">
                  <span className="font-bold text-xs tracking-widest uppercase">Cognitive Load</span> <BrainCircuit size={18} />
                </div>
                <p className="text-sm text-onyx-600 leading-relaxed">Dense paragraphs are ignored. We restrict summary lengths to reduce mental friction.</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500 -mr-2 border-2 border-white shrink-0 z-10"></div>
              <div className="w-16 h-[2px] bg-blue-200 shrink-0"></div>
            </motion.div>
          </motion.div>

          {/* Experience Layer */}
          <motion.div 
            style={{ y: yExperience, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-36 left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-8 shadow-md z-20 transition-colors hover:border-emerald-300"
          >
            <div className="h-4 w-1/3 bg-onyx-200 rounded-md mb-6"></div>
            <div className="flex gap-3 mb-3"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1.5 shrink-0"></div><div className="h-3 w-full bg-onyx-100 rounded-md"></div></div>
            <div className="flex gap-3 mb-3"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1.5 shrink-0"></div><div className="h-3 w-5/6 bg-onyx-100 rounded-md"></div></div>
            <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1.5 shrink-0"></div><div className="h-3 w-4/6 bg-onyx-100 rounded-md"></div></div>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsRight }} className="absolute top-1/2 left-[105%] flex items-center w-72">
              <div className="w-16 h-[2px] bg-emerald-200 shrink-0"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 -ml-2 border-2 border-white shrink-0 z-10"></div>
              <div className="ml-4 bg-white p-4 rounded-lg shadow-lg border border-onyx-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <MousePointerClick size={18} /> <span className="font-bold text-xs tracking-widest uppercase">Action-Verbs</span>
                </div>
                <p className="text-sm text-onyx-600 leading-relaxed">Templates format bullet points for impact, guiding you to start with strong verbs.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Layer */}
          <motion.div 
            style={{ y: ySkills, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-64 left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-8 shadow-sm z-10 transition-colors hover:border-purple-300"
          >
            <div className="h-4 w-1/4 bg-onyx-200 rounded-md mb-6"></div>
            <div className="flex gap-3 flex-wrap">
              <div className="h-8 w-20 bg-onyx-100 rounded-md"></div>
              <div className="h-8 w-24 bg-onyx-100 rounded-md"></div>
              <div className="h-8 w-16 bg-onyx-100 rounded-md"></div>
              <div className="h-8 w-28 bg-onyx-100 rounded-md"></div>
            </div>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsLeft }} className="absolute top-1/2 right-[105%] flex items-center justify-end w-72">
              <div className="mr-4 bg-white p-4 rounded-lg shadow-lg border border-onyx-100 text-right">
                <div className="flex items-center justify-end gap-2 text-purple-600 mb-2">
                  <span className="font-bold text-xs tracking-widest uppercase">ATS Matrix</span> <Search size={18} />
                </div>
                <p className="text-sm text-onyx-600 leading-relaxed">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy.</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-purple-500 -mr-2 border-2 border-white shrink-0 z-10"></div>
              <div className="w-16 h-[2px] bg-purple-200 shrink-0"></div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Mobile Fallback - Static stacked cards */}
      <div className="md:hidden w-full px-6 flex flex-col gap-6 relative z-10">
        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-brand-600 mb-3">
             <Eye size={18} /> <span className="font-bold text-xs tracking-widest uppercase">The F-Pattern Anchor</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Recruiters spend 7.4 seconds scanning. Their eyes anchor top-left. Our headers ensure your name and title are instantly processed.</p>
        </div>
        
        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <BrainCircuit size={18} /> <span className="font-bold text-xs tracking-widest uppercase">Cognitive Load</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Dense paragraphs are ignored. We restrict summary lengths to ensure high readability and reduce mental friction.</p>
        </div>

        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 mb-3">
            <MousePointerClick size={18} /> <span className="font-bold text-xs tracking-widest uppercase">Action-Verb Density</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Bullet points formatted for impact. The templates guide you to start with strong verbs, maximizing persuasive power.</p>
        </div>

        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 mb-3">
            <Search size={18} /> <span className="font-bold text-xs tracking-widest uppercase">ATS Parsing Matrix</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy by applicant tracking systems.</p>
        </div>
      </div>
    </section>
  );
}
