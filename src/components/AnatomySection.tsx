import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimationProps } from 'framer-motion';
import { Eye, BrainCircuit, Search, MousePointerClick } from 'lucide-react';

export default function AnatomySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll mapping
  // Starts flat (z=0), expands to distinct layers as it scrolls to the center
  const zHeader = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 80, 80]);
  const zSummary = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 40, 40]);
  const zExperience = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0, 0]);
  const zSkills = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, -40, -40]);

  const opacityLabels = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Gentle float animation post-expansion
  const floatAnimation: AnimationProps["animate"] = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[150vh] bg-gradient-to-b from-onyx-950 to-onyx-900 overflow-hidden flex flex-col items-center pt-24"
    >
      <div className="text-center z-10 mb-16 max-w-2xl px-6">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">The Science of the Resume</h2>
        <p className="text-onyx-300">
          We designed our templates based on eye-tracking science and ATS parsing algorithms. 
          Scroll down to see exactly how a modern resume is digested by humans and machines.
        </p>
      </div>

      <div className="sticky top-1/4 w-full max-w-6xl mx-auto h-[60vh] flex items-center justify-center perspective-[2000px] mb-32 hidden md:flex">
        {/* Container with 3D rotation */}
        <motion.div 
          className="relative w-full max-w-lg transform-style-3d"
          style={{ 
            rotateX: 60, 
            rotateZ: -45,
          }}
          animate={floatAnimation}
        >
          {/* Header Layer */}
          <motion.div 
            style={{ translateZ: zHeader }}
            className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md border border-brand-200/50 rounded-lg p-6 shadow-2xl transition-shadow hover:shadow-brand-500/20"
          >
            <div className="h-4 w-3/4 bg-onyx-200 rounded mb-4"></div>
            <div className="h-3 w-1/2 bg-onyx-100 rounded"></div>
            
            {/* Label Line */}
            <motion.div 
              style={{ opacity: opacityLabels }}
              className="absolute top-1/2 left-[110%] w-32 h-[1px] bg-brand-400 flex items-center"
            >
              <div className="w-2 h-2 rounded-full bg-brand-500 absolute -left-1"></div>
              <div className="absolute left-full ml-4 w-64 text-left" style={{ transform: 'rotateX(-60deg) rotateZ(45deg)', transformOrigin: 'top left' }}>
                <div className="flex items-center gap-2 text-brand-400 mb-1">
                  <Eye size={16} /> <span className="font-bold text-sm tracking-widest uppercase">The F-Pattern Anchor</span>
                </div>
                <p className="text-xs text-onyx-300">Recruiters spend 7.4 seconds scanning. Their eyes anchor top-left. Our headers ensure your name and title are instantly processed.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Summary Layer */}
          <motion.div 
            style={{ translateZ: zSummary }}
            className="absolute top-24 left-0 w-full bg-white/90 backdrop-blur-md border border-onyx-200/50 rounded-lg p-6 shadow-xl"
          >
            <div className="h-3 w-full bg-onyx-100 rounded mb-2"></div>
            <div className="h-3 w-5/6 bg-onyx-100 rounded mb-2"></div>
            <div className="h-3 w-4/6 bg-onyx-100 rounded"></div>
            
            <motion.div 
              style={{ opacity: opacityLabels }}
              className="absolute top-1/2 left-[110%] w-48 h-[1px] bg-blue-400 flex items-center"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute -left-1"></div>
              <div className="absolute left-full ml-4 w-64 text-left" style={{ transform: 'rotateX(-60deg) rotateZ(45deg)', transformOrigin: 'top left' }}>
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <BrainCircuit size={16} /> <span className="font-bold text-sm tracking-widest uppercase">Cognitive Load</span>
                </div>
                <p className="text-xs text-onyx-300">Dense paragraphs are ignored. We restrict summary lengths to ensure high readability and reduce mental friction.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Experience Layer */}
          <motion.div 
            style={{ translateZ: zExperience }}
            className="absolute top-52 left-0 w-full bg-white/85 backdrop-blur-md border border-onyx-200/30 rounded-lg p-6 shadow-lg"
          >
            <div className="h-4 w-1/3 bg-onyx-200 rounded mb-4"></div>
            <div className="flex gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1"></div><div className="h-3 w-full bg-onyx-100 rounded"></div></div>
            <div className="flex gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1"></div><div className="h-3 w-5/6 bg-onyx-100 rounded"></div></div>
            <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-onyx-300 mt-1"></div><div className="h-3 w-4/6 bg-onyx-100 rounded"></div></div>
            
            <motion.div 
              style={{ opacity: opacityLabels }}
              className="absolute top-1/2 left-[110%] w-32 h-[1px] bg-emerald-400 flex items-center"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 absolute -left-1"></div>
              <div className="absolute left-full ml-4 w-64 text-left" style={{ transform: 'rotateX(-60deg) rotateZ(45deg)', transformOrigin: 'top left' }}>
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <MousePointerClick size={16} /> <span className="font-bold text-sm tracking-widest uppercase">Action-Verb Density</span>
                </div>
                <p className="text-xs text-onyx-300">Bullet points formatted for impact. The templates guide you to start with strong verbs, maximizing persuasive power.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Layer */}
          <motion.div 
            style={{ translateZ: zSkills }}
            className="absolute top-80 left-0 w-full bg-white/80 backdrop-blur-md border border-onyx-200/20 rounded-lg p-6 shadow-md mb-20"
          >
            <div className="h-4 w-1/4 bg-onyx-200 rounded mb-4"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 w-16 bg-brand-100 rounded-full"></div>
              <div className="h-6 w-20 bg-brand-100 rounded-full"></div>
              <div className="h-6 w-14 bg-brand-100 rounded-full"></div>
              <div className="h-6 w-24 bg-brand-100 rounded-full"></div>
            </div>
            
            <motion.div 
              style={{ opacity: opacityLabels }}
              className="absolute top-1/2 left-[110%] w-48 h-[1px] bg-purple-400 flex items-center"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 absolute -left-1"></div>
              <div className="absolute left-full ml-4 w-64 text-left" style={{ transform: 'rotateX(-60deg) rotateZ(45deg)', transformOrigin: 'top left' }}>
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Search size={16} /> <span className="font-bold text-sm tracking-widest uppercase">ATS Parsing Matrix</span>
                </div>
                <p className="text-xs text-onyx-300">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy by applicant tracking systems.</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Base Shadow/Grid */}
          <motion.div 
            style={{ translateZ: -100 }}
            className="absolute top-32 -left-10 w-[120%] h-[120%] bg-gradient-to-t from-brand-900/20 to-transparent border border-brand-500/10 rounded-xl"
          ></motion.div>

        </motion.div>
      </div>
      
      {/* Mobile Fallback - The 3D effect might not work well on small screens */}
      <div className="md:hidden w-full px-6 flex flex-col gap-6 relative z-10 pb-24">
        <div className="bg-onyx-900/50 backdrop-blur border border-onyx-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-brand-400 mb-2">
             <Eye size={16} /> <span className="font-bold text-sm tracking-widest uppercase">The F-Pattern Anchor</span>
          </div>
          <p className="text-sm text-onyx-300">Recruiters spend 7.4 seconds scanning. Their eyes anchor top-left. Our headers ensure your name and title are instantly processed.</p>
        </div>
        
        <div className="bg-onyx-900/50 backdrop-blur border border-onyx-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <BrainCircuit size={16} /> <span className="font-bold text-sm tracking-widest uppercase">Cognitive Load</span>
          </div>
          <p className="text-sm text-onyx-300">Dense paragraphs are ignored. We restrict summary lengths to ensure high readability and reduce mental friction.</p>
        </div>

        <div className="bg-onyx-900/50 backdrop-blur border border-onyx-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <MousePointerClick size={16} /> <span className="font-bold text-sm tracking-widest uppercase">Action-Verb Density</span>
          </div>
          <p className="text-sm text-onyx-300">Bullet points formatted for impact. The templates guide you to start with strong verbs, maximizing persuasive power.</p>
        </div>

        <div className="bg-onyx-900/50 backdrop-blur border border-onyx-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Search size={16} /> <span className="font-bold text-sm tracking-widest uppercase">ATS Parsing Matrix</span>
          </div>
          <p className="text-sm text-onyx-300">Robots read keyword clusters. Our isolated skills section ensures 100% extraction accuracy by applicant tracking systems.</p>
        </div>
      </div>
    </section>
  );
}
