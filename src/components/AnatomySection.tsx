import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, BrainCircuit, Search, MousePointerClick } from 'lucide-react';

export default function AnatomySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Tighter vertical spacing to prevent clipping on laptops
  const yHeader = useTransform(scrollYProgress, [0.3, 0.6], [0, -60]);
  const ySummary = useTransform(scrollYProgress, [0.3, 0.6], [0, -10]);
  const yExperience = useTransform(scrollYProgress, [0.3, 0.6], [0, 40]);
  const ySkills = useTransform(scrollYProgress, [0.3, 0.6], [0, 90]);

  // Labels fade in as it explodes
  const opacityLabels = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const xLabelsRight = useTransform(scrollYProgress, [0.4, 0.6], [-20, 0]);
  const xLabelsLeft = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  // Gentle continuous float
  const floatAnimation: any = {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[140vh] bg-onyx-50/50 overflow-hidden flex flex-col items-center pt-24 pb-24 border-y border-onyx-200"
    >
      <div className="text-center z-10 mb-8 max-w-3xl px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-onyx-900 mb-6">The Anatomy of a Perfect Resume</h2>
        <p className="text-lg text-onyx-500">
          We didn't just design templates. We engineered them based on eye-tracking science and ATS parsing algorithms. 
          Scroll down to see exactly how a modern resume is digested.
        </p>
      </div>

      {/* Changed to h-[80vh] to give more vertical breathing room on laptops */}
      <div className="sticky top-[10vh] w-full max-w-5xl mx-auto h-[80vh] hidden md:flex items-center justify-center">
        
        {/* Central 2.5D Stack */}
        <motion.div 
          className="relative w-full max-w-lg perspective-[1000px]"
          animate={floatAnimation}
        >
          {/* Base Shadow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 w-3/4 h-12 bg-onyx-200/50 rounded-[100%] blur-2xl"></div>

          {/* Header Layer */}
          <motion.div 
            style={{ y: yHeader, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-0 left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-5 shadow-xl z-40 transition-colors hover:border-brand-300"
          >
            <h3 className="text-2xl font-serif font-bold text-onyx-900 leading-tight">Sarah Jenkins</h3>
            <p className="text-brand-600 font-medium text-sm mb-2">Senior Product Designer</p>
            <p className="text-xs text-onyx-500">San Francisco, CA • sarah@design.io • (555) 123-4567 • linkedin.com/in/sarahj</p>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsRight }} className="absolute top-1/2 left-[105%] flex items-center w-64">
              <div className="w-12 h-[2px] bg-brand-200 shrink-0"></div>
              <div className="w-3 h-3 rounded-full bg-brand-500 -ml-2 border-2 border-white shrink-0 z-10"></div>
              <div className="ml-4 bg-white p-3 rounded-lg shadow-lg border border-onyx-100">
                <div className="flex items-center gap-2 text-brand-600 mb-1">
                  <Eye size={16} /> <span className="font-bold text-[10px] tracking-widest uppercase">The F-Pattern</span>
                </div>
                <p className="text-xs text-onyx-600 leading-relaxed">Recruiters anchor top-left. Our headers ensure your name and title are instantly processed.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Summary Layer */}
          <motion.div 
            style={{ y: ySummary, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-[88px] left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-5 shadow-lg z-30 transition-colors hover:border-blue-300"
          >
            <h4 className="text-xs font-bold text-onyx-400 uppercase tracking-wider mb-2">Professional Summary</h4>
            <p className="text-sm text-onyx-800 leading-relaxed">
              Award-winning Product Designer with 7+ years of experience specializing in B2B SaaS interfaces. Proven track record of increasing user retention by 40% through intuitive, accessible design systems and rigorous A/B testing methodologies.
            </p>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsLeft }} className="absolute top-1/2 right-[105%] flex items-center justify-end w-64">
              <div className="mr-4 bg-white p-3 rounded-lg shadow-lg border border-onyx-100 text-right">
                <div className="flex items-center justify-end gap-2 text-blue-600 mb-1">
                  <span className="font-bold text-[10px] tracking-widest uppercase">Cognitive Load</span> <BrainCircuit size={16} />
                </div>
                <p className="text-xs text-onyx-600 leading-relaxed">Dense paragraphs are ignored. We restrict summary lengths to reduce mental friction.</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500 -mr-2 border-2 border-white shrink-0 z-10"></div>
              <div className="w-12 h-[2px] bg-blue-200 shrink-0"></div>
            </motion.div>
          </motion.div>

          {/* Experience Layer */}
          <motion.div 
            style={{ y: yExperience, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-[200px] left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-5 shadow-md z-20 transition-colors hover:border-emerald-300"
          >
            <h4 className="text-xs font-bold text-onyx-400 uppercase tracking-wider mb-3">Experience</h4>
            
            <div className="mb-1 flex justify-between items-end">
              <h5 className="font-bold text-onyx-900 text-sm">Lead UI/UX Designer <span className="text-onyx-500 font-normal">at TechFlow</span></h5>
              <span className="text-xs text-onyx-500">2021 — Present</span>
            </div>
            <ul className="text-sm text-onyx-700 space-y-1.5 list-disc list-outside ml-4">
              <li><strong className="text-emerald-700">Spearheaded</strong> the redesign of the core analytics dashboard, resulting in a 25% decrease in customer support tickets.</li>
              <li><strong className="text-emerald-700">Orchestrated</strong> a complete migration to Figma, saving the design team 15 hours weekly.</li>
              <li><strong className="text-emerald-700">Mentored</strong> 3 junior designers, elevating overall team output quality.</li>
            </ul>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsRight }} className="absolute top-1/2 left-[105%] flex items-center w-64">
              <div className="w-12 h-[2px] bg-emerald-200 shrink-0"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 -ml-2 border-2 border-white shrink-0 z-10"></div>
              <div className="ml-4 bg-white p-3 rounded-lg shadow-lg border border-onyx-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <MousePointerClick size={16} /> <span className="font-bold text-[10px] tracking-widest uppercase">Action-Verbs</span>
                </div>
                <p className="text-xs text-onyx-600 leading-relaxed">Templates format bullet points for impact, guiding you to start with strong verbs.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Layer */}
          <motion.div 
            style={{ y: ySkills, rotateX: 10, rotateY: -15, rotateZ: 2 }}
            className="absolute top-[380px] left-0 w-full bg-white backdrop-blur-md border border-onyx-200 rounded-xl p-5 shadow-sm z-10 transition-colors hover:border-purple-300"
          >
            <h4 className="text-xs font-bold text-onyx-400 uppercase tracking-wider mb-3">Core Competencies</h4>
            <div className="flex gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 bg-onyx-100 text-onyx-800 rounded-md font-medium">Interaction Design</span>
              <span className="px-3 py-1 bg-onyx-100 text-onyx-800 rounded-md font-medium">Prototyping</span>
              <span className="px-3 py-1 bg-onyx-100 text-onyx-800 rounded-md font-medium">User Testing</span>
              <span className="px-3 py-1 bg-onyx-100 text-onyx-800 rounded-md font-medium">Figma</span>
              <span className="px-3 py-1 bg-onyx-100 text-onyx-800 rounded-md font-medium">HTML/CSS</span>
            </div>
            
            <motion.div style={{ opacity: opacityLabels, x: xLabelsLeft }} className="absolute top-1/2 right-[105%] flex items-center justify-end w-64">
              <div className="mr-4 bg-white p-3 rounded-lg shadow-lg border border-onyx-100 text-right">
                <div className="flex items-center justify-end gap-2 text-purple-600 mb-1">
                  <span className="font-bold text-[10px] tracking-widest uppercase">ATS Matrix</span> <Search size={16} />
                </div>
                <p className="text-xs text-onyx-600 leading-relaxed">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy.</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-purple-500 -mr-2 border-2 border-white shrink-0 z-10"></div>
              <div className="w-12 h-[2px] bg-purple-200 shrink-0"></div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Mobile Fallback - Static stacked cards */}
      <div className="md:hidden w-full px-6 flex flex-col gap-6 relative z-10">
        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-brand-600 mb-2">
             <Eye size={16} /> <span className="font-bold text-xs tracking-widest uppercase">The F-Pattern Anchor</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Recruiters spend 7.4 seconds scanning. Their eyes anchor top-left. Our headers ensure your name and title are instantly processed.</p>
        </div>
        
        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BrainCircuit size={16} /> <span className="font-bold text-xs tracking-widest uppercase">Cognitive Load</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Dense paragraphs are ignored. We restrict summary lengths to ensure high readability and reduce mental friction.</p>
        </div>

        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <MousePointerClick size={16} /> <span className="font-bold text-xs tracking-widest uppercase">Action-Verb Density</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Bullet points formatted for impact. The templates guide you to start with strong verbs, maximizing persuasive power.</p>
        </div>

        <div className="bg-white border border-onyx-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Search size={16} /> <span className="font-bold text-xs tracking-widest uppercase">ATS Parsing Matrix</span>
          </div>
          <p className="text-sm text-onyx-600 leading-relaxed">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy by applicant tracking systems.</p>
        </div>
      </div>
    </section>
  );
}
