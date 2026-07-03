import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ChevronDown, ChevronUp, Plus, Trash2, LayoutTemplate, Palette, Type, Upload } from 'lucide-react';

const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Playfair Display', 'Merriweather', 
  'Oswald', 'Fira Code', 'Space Mono', 'Montserrat',
  'Lora', 'Work Sans'
];

const ACCENT_COLORS = [
  { id: 'slate', text: 'text-slate-900', bg: 'bg-slate-900', border: 'border-slate-900' },
  { id: 'brand', text: 'text-brand-600', bg: 'bg-brand-600', border: 'border-brand-600' },
  { id: 'emerald', text: 'text-emerald-600', bg: 'bg-emerald-600', border: 'border-emerald-600' },
  { id: 'rose', text: 'text-rose-600', bg: 'bg-rose-600', border: 'border-rose-600' },
  { id: 'amber', text: 'text-amber-600', bg: 'bg-amber-600', border: 'border-amber-600' },
  { id: 'indigo', text: 'text-indigo-600', bg: 'bg-indigo-600', border: 'border-indigo-600' },
];

export default function Editor() {
  const { 
    resumeData, activeTemplate, setTemplate, activeFont, setFont, activeColor, setColor,
    updateBasics, addWork, updateWork, removeWork,
    addEducation, updateEducation, removeEducation,
    addSkill, updateSkill, removeSkill,
    addProject, updateProject, removeProject
  } = useResumeStore();
  
  const [openSection, setOpenSection] = useState<string>('basics');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBasics({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamically load Google Font
  useEffect(() => {
    if (activeFont && !activeFont.startsWith('font-')) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${activeFont.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [activeFont]);

  // Shared classes for brutalist/industrial styling
  const cardClass = "bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-6 transition-all hover:border-slate-300";
  const headerClass = "w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors border-b border-slate-100";
  const headerTextClass = "font-sans font-bold text-lg uppercase tracking-widest text-slate-950";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5";
  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all text-sm font-medium text-slate-900";
  const addBtnClass = "w-full py-4 mt-2 border-2 border-dashed border-slate-300 text-slate-950 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all";

  const templateSupportsPhoto = !['ats-standard', 'tech-pro', 'classic-professional', 'academic'].includes(activeTemplate);

  return (
    <div className="flex flex-col pb-24 font-sans">
      
      {/* Design Settings - Brutalist Pill Layout */}
      <div className="bg-slate-950 rounded-3xl p-6 mb-8 text-white shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-800 pb-2">Design Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Template */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <LayoutTemplate size={12} /> Template
            </h4>
            <select 
              value={activeTemplate}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full bg-slate-800 border-none text-white text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              <optgroup label="ATS & Simple">
                <option value="ats-standard">ATS Standard</option>
                <option value="tech-pro">Tech Pro</option>
              </optgroup>
              <optgroup label="Professional">
                <option value="executive">Executive</option>
                <option value="classic-professional">Classic Professional</option>
                <option value="academic">Academic / CV</option>
              </optgroup>
              <optgroup label="Modern & Creative">
                <option value="modern-minimalist">Modern Minimalist</option>
                <option value="startup-modern">Startup Modern</option>
                <option value="designer-portfolio">Designer Portfolio</option>
                <option value="creative-block">Creative Block</option>
              </optgroup>
            </select>
          </div>

          {/* Font Dropdown */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Type size={12} /> Google Font
            </h4>
            <select 
              value={activeFont}
              onChange={(e) => setFont(e.target.value)}
              className="w-full bg-slate-800 border-none text-white text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              <option value="font-sans">Default Sans</option>
              <option value="font-serif">Default Serif</option>
              <option value="font-mono">Default Mono</option>
              <optgroup label="Google Fonts">
                {GOOGLE_FONTS.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Color Theme */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Palette size={12} /> Accent Color
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${c.bg} ${activeColor.id === c.id ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  aria-label={`Color ${c.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Basics Section */}
      <div className={cardClass}>
        <button onClick={() => toggleSection('basics')} className={headerClass}>
          <span className={headerTextClass}>Personal Details</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            {openSection === 'basics' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        
        {openSection === 'basics' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
            {/* Smart Photo Upload */}
            {templateSupportsPhoto ? (
              <div className="col-span-2 flex items-center gap-5 mb-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center overflow-hidden">
                  {resumeData.basics.photo ? (
                    <img src={resumeData.basics.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={20} className="text-slate-400" />
                  )}
                </div>
                <div>
                  <label className={labelClass}>Profile Photo</label>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-950 file:text-white hover:file:bg-slate-800 transition-colors" />
                  {resumeData.basics.photo && <button onClick={() => updateBasics({ photo: '' })} className="text-xs font-bold text-red-500 ml-2 uppercase tracking-wider">Remove</button>}
                </div>
              </div>
            ) : (
              <div className="col-span-2 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold mb-2">
                Photo upload is disabled for this template format to ensure maximum ATS compatibility.
              </div>
            )}

            <div className="col-span-2">
              <label className={labelClass}>Full Name</label>
              <input type="text" value={resumeData.basics.name} onChange={(e) => updateBasics({ name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Professional Title</label>
              <input type="text" value={resumeData.basics.label} onChange={(e) => updateBasics({ label: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={resumeData.basics.email} onChange={(e) => updateBasics({ email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={resumeData.basics.phone} onChange={(e) => updateBasics({ phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" value={resumeData.basics.location} onChange={(e) => updateBasics({ location: e.target.value })} className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>URL / Portfolio</label>
              <input type="text" value={resumeData.basics.url} onChange={(e) => updateBasics({ url: e.target.value })} className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Professional Summary</label>
              <textarea value={resumeData.basics.summary} onChange={(e) => updateBasics({ summary: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience Section */}
      <div className={cardClass}>
        <button onClick={() => toggleSection('work')} className={headerClass}>
          <span className={headerTextClass}>Work Experience</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            {openSection === 'work' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        {openSection === 'work' && (
          <div className="p-6 flex flex-col gap-5 bg-white">
            {resumeData.work.map((job) => (
              <div key={job.id} className="relative border-2 border-slate-100 p-5 rounded-2xl bg-slate-50">
                <button onClick={() => removeWork(job.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className={labelClass}>Company</label><input type="text" value={job.company} onChange={(e) => updateWork(job.id, { company: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Position</label><input type="text" value={job.position} onChange={(e) => updateWork(job.id, { position: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Start Date</label><input type="text" value={job.startDate} onChange={(e) => updateWork(job.id, { startDate: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>End Date</label><input type="text" value={job.endDate} onChange={(e) => updateWork(job.id, { endDate: e.target.value })} className={inputClass} /></div>
                  <div className="col-span-2"><label className={labelClass}>Highlights (One per line)</label><textarea value={job.highlights.join('\n')} onChange={(e) => updateWork(job.id, { highlights: e.target.value.split('\n') })} rows={4} className={`${inputClass} resize-none`} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addWork({ company: '', position: '', startDate: '', endDate: '', highlights: [] })} className={addBtnClass}>
              <Plus size={16} strokeWidth={3} /> Add Employment
            </button>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className={cardClass}>
        <button onClick={() => toggleSection('education')} className={headerClass}>
          <span className={headerTextClass}>Education</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            {openSection === 'education' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        {openSection === 'education' && (
          <div className="p-6 flex flex-col gap-5 bg-white">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="relative border-2 border-slate-100 p-5 rounded-2xl bg-slate-50">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div className="col-span-2"><label className={labelClass}>Institution</label><input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Degree / Study Type</label><input type="text" value={edu.studyType} onChange={(e) => updateEducation(edu.id, { studyType: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Area of Study</label><input type="text" value={edu.area} onChange={(e) => updateEducation(edu.id, { area: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Start Date</label><input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>End Date</label><input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} className={inputClass} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addEducation({ institution: '', area: '', studyType: '', startDate: '', endDate: '' })} className={addBtnClass}>
              <Plus size={16} strokeWidth={3} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className={cardClass}>
        <button onClick={() => toggleSection('skills')} className={headerClass}>
          <span className={headerTextClass}>Skills</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            {openSection === 'skills' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        {openSection === 'skills' && (
          <div className="p-6 flex flex-col gap-5 bg-white">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="relative border-2 border-slate-100 p-5 rounded-2xl bg-slate-50">
                <button onClick={() => removeSkill(skill.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className={labelClass}>Category / Group</label><input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, { name: e.target.value })} className={inputClass} /></div>
                  <div className="col-span-2"><label className={labelClass}>Skills (Comma separated)</label><input type="text" value={skill.keywords.join(', ')} onChange={(e) => updateSkill(skill.id, { keywords: e.target.value.split(',').map(s=>s.trim()) })} className={inputClass} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addSkill({ name: '', level: '', keywords: [] })} className={addBtnClass}>
              <Plus size={16} strokeWidth={3} /> Add Skill Group
            </button>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className={cardClass}>
        <button onClick={() => toggleSection('projects')} className={headerClass}>
          <span className={headerTextClass}>Projects</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            {openSection === 'projects' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        {openSection === 'projects' && (
          <div className="p-6 flex flex-col gap-5 bg-white">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="relative border-2 border-slate-100 p-5 rounded-2xl bg-slate-50">
                <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className={labelClass}>Project Name</label><input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>URL (Optional)</label><input type="text" value={proj.url} onChange={(e) => updateProject(proj.id, { url: e.target.value })} className={inputClass} /></div>
                  <div className="col-span-2"><label className={labelClass}>Description / Subtitle</label><input type="text" value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} className={inputClass} /></div>
                  <div className="col-span-2"><label className={labelClass}>Highlights (One per line)</label><textarea value={proj.highlights.join('\n')} onChange={(e) => updateProject(proj.id, { highlights: e.target.value.split('\n') })} rows={3} className={`${inputClass} resize-none`} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addProject({ name: '', description: '', url: '', highlights: [] })} className={addBtnClass}>
              <Plus size={16} strokeWidth={3} /> Add Project
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
