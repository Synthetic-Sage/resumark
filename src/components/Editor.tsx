import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ChevronDown, ChevronUp, Plus, Trash2, LayoutTemplate, Palette, Type, Upload } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-4 pb-24">
      
      {/* Design Settings */}
      <div className="bg-white dark:bg-onyx-900 border border-brand-200 dark:border-brand-800 rounded-lg p-4 mb-4 shadow-soft grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Template */}
        <div>
          <h3 className="text-xs font-bold text-onyx-600 dark:text-onyx-300 uppercase tracking-wider mb-2 flex items-center gap-1">
            <LayoutTemplate size={14} /> Template
          </h3>
          <div className="flex flex-col gap-1">
            {[
              { id: 'ats-standard', name: 'ATS Standard' },
              { id: 'modern-minimalist', name: 'Minimalist' },
              { id: 'executive', name: 'Executive' },
              { id: 'creative-block', name: 'Creative' },
              { id: 'tech-pro', name: 'Tech Pro' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`text-left px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  activeTemplate === t.id ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300' : 'hover:bg-onyx-100 dark:hover:bg-onyx-800 text-onyx-600 dark:text-onyx-400'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Font */}
        <div>
          <h3 className="text-xs font-bold text-onyx-600 dark:text-onyx-300 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Type size={14} /> Font Pair
          </h3>
          <div className="flex flex-col gap-1">
            {[
              { id: 'font-sans', name: 'Jakarta (Modern)' },
              { id: 'font-serif', name: 'Playfair (Classic)' },
              { id: 'font-mono', name: 'JetBrains (Tech)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFont(f.id)}
                className={`text-left px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  activeFont === f.id ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300' : 'hover:bg-onyx-100 dark:hover:bg-onyx-800 text-onyx-600 dark:text-onyx-400'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Color Theme */}
        <div>
          <h3 className="text-xs font-bold text-onyx-600 dark:text-onyx-300 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Palette size={14} /> Accent Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'text-brand-600', bg: 'bg-brand-600' },
              { id: 'text-blue-600', bg: 'bg-blue-600' },
              { id: 'text-emerald-600', bg: 'bg-emerald-600' },
              { id: 'text-purple-600', bg: 'bg-purple-600' },
              { id: 'text-gray-900', bg: 'bg-gray-900' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${c.bg} ${activeColor === c.id ? 'border-onyx-900 dark:border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                aria-label={`Color ${c.id}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Basics Section */}
      <div className="bg-white dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 rounded-lg overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('basics')}
          className="w-full px-6 py-4 flex justify-between items-center bg-onyx-50 dark:bg-onyx-950 hover:bg-onyx-100 dark:hover:bg-onyx-900 transition-colors"
        >
          <span className="font-serif font-bold text-lg">Personal Details</span>
          {openSection === 'basics' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {openSection === 'basics' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Photo Upload */}
            <div className="col-span-2 flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-onyx-100 dark:bg-onyx-800 border border-onyx-200 dark:border-onyx-700 flex items-center justify-center overflow-hidden">
                {resumeData.basics.photo ? (
                  <img src={resumeData.basics.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={24} className="text-onyx-400" />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs text-onyx-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-onyx-800 dark:file:text-onyx-300" />
                {resumeData.basics.photo && <button onClick={() => updateBasics({ photo: '' })} className="text-xs text-red-500 ml-2">Remove</button>}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Full Name</label>
              <input type="text" value={resumeData.basics.name} onChange={(e) => updateBasics({ name: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Professional Title</label>
              <input type="text" value={resumeData.basics.label} onChange={(e) => updateBasics({ label: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Email</label>
              <input type="email" value={resumeData.basics.email} onChange={(e) => updateBasics({ email: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Phone</label>
              <input type="tel" value={resumeData.basics.phone} onChange={(e) => updateBasics({ phone: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Location</label>
              <input type="text" value={resumeData.basics.location} onChange={(e) => updateBasics({ location: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">URL / Portfolio</label>
              <input type="text" value={resumeData.basics.url} onChange={(e) => updateBasics({ url: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Professional Summary</label>
              <textarea value={resumeData.basics.summary} onChange={(e) => updateBasics({ summary: e.target.value })} rows={4} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition resize-none" />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience Section */}
      <div className="bg-white dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 rounded-lg overflow-hidden shadow-sm">
        <button onClick={() => toggleSection('work')} className="w-full px-6 py-4 flex justify-between items-center bg-onyx-50 dark:bg-onyx-950 hover:bg-onyx-100 dark:hover:bg-onyx-900 transition-colors">
          <span className="font-serif font-bold text-lg">Work Experience</span>
          {openSection === 'work' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSection === 'work' && (
          <div className="p-6 flex flex-col gap-6">
            {resumeData.work.map((job) => (
              <div key={job.id} className="relative border border-onyx-200 dark:border-onyx-800 p-4 rounded-lg bg-onyx-50/50 dark:bg-onyx-950/50">
                <button onClick={() => removeWork(job.id)} className="absolute top-4 right-4 text-onyx-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Company</label><input type="text" value={job.company} onChange={(e) => updateWork(job.id, { company: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 transition" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Position</label><input type="text" value={job.position} onChange={(e) => updateWork(job.id, { position: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 transition" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Start Date</label><input type="text" value={job.startDate} onChange={(e) => updateWork(job.id, { startDate: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 transition" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">End Date</label><input type="text" value={job.endDate} onChange={(e) => updateWork(job.id, { endDate: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 transition" /></div>
                  <div className="col-span-2"><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Highlights (One per line)</label><textarea value={job.highlights.join('\n')} onChange={(e) => updateWork(job.id, { highlights: e.target.value.split('\n') })} rows={4} className="w-full px-3 py-2 bg-white dark:bg-onyx-950 border border-onyx-300 dark:border-onyx-700 rounded focus:outline-none focus:border-brand-600 transition resize-none" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addWork({ company: '', position: '', startDate: '', endDate: '', highlights: [] })} className="w-full py-3 border-2 border-dashed border-brand-300 text-brand-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"><Plus size={20} /> Add Employment</button>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="bg-white dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 rounded-lg overflow-hidden shadow-sm">
        <button onClick={() => toggleSection('education')} className="w-full px-6 py-4 flex justify-between items-center bg-onyx-50 dark:bg-onyx-950 hover:bg-onyx-100 dark:hover:bg-onyx-900 transition-colors">
          <span className="font-serif font-bold text-lg">Education</span>
          {openSection === 'education' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSection === 'education' && (
          <div className="p-6 flex flex-col gap-6">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="relative border border-onyx-200 dark:border-onyx-800 p-4 rounded-lg bg-onyx-50/50 dark:bg-onyx-950/50">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-onyx-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div className="col-span-2"><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Institution</label><input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Degree / Study Type</label><input type="text" value={edu.studyType} onChange={(e) => updateEducation(edu.id, { studyType: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Area of Study</label><input type="text" value={edu.area} onChange={(e) => updateEducation(edu.id, { area: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Start Date</label><input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">End Date</label><input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addEducation({ institution: '', area: '', studyType: '', startDate: '', endDate: '' })} className="w-full py-3 border-2 border-dashed border-brand-300 text-brand-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"><Plus size={20} /> Add Education</button>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 rounded-lg overflow-hidden shadow-sm">
        <button onClick={() => toggleSection('skills')} className="w-full px-6 py-4 flex justify-between items-center bg-onyx-50 dark:bg-onyx-950 hover:bg-onyx-100 dark:hover:bg-onyx-900 transition-colors">
          <span className="font-serif font-bold text-lg">Skills</span>
          {openSection === 'skills' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSection === 'skills' && (
          <div className="p-6 flex flex-col gap-6">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="relative border border-onyx-200 dark:border-onyx-800 p-4 rounded-lg bg-onyx-50/50 dark:bg-onyx-950/50">
                <button onClick={() => removeSkill(skill.id)} className="absolute top-4 right-4 text-onyx-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Category / Group (e.g. Languages)</label><input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, { name: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div className="col-span-2"><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Skills (Comma separated)</label><input type="text" value={skill.keywords.join(', ')} onChange={(e) => updateSkill(skill.id, { keywords: e.target.value.split(',').map(s=>s.trim()) })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addSkill({ name: '', level: '', keywords: [] })} className="w-full py-3 border-2 border-dashed border-brand-300 text-brand-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"><Plus size={20} /> Add Skill Group</button>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="bg-white dark:bg-onyx-900 border border-onyx-200 dark:border-onyx-800 rounded-lg overflow-hidden shadow-sm">
        <button onClick={() => toggleSection('projects')} className="w-full px-6 py-4 flex justify-between items-center bg-onyx-50 dark:bg-onyx-950 hover:bg-onyx-100 dark:hover:bg-onyx-900 transition-colors">
          <span className="font-serif font-bold text-lg">Projects</span>
          {openSection === 'projects' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSection === 'projects' && (
          <div className="p-6 flex flex-col gap-6">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="relative border border-onyx-200 dark:border-onyx-800 p-4 rounded-lg bg-onyx-50/50 dark:bg-onyx-950/50">
                <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-onyx-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Project Name</label><input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">URL (Optional)</label><input type="text" value={proj.url} onChange={(e) => updateProject(proj.id, { url: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div className="col-span-2"><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Description / Subtitle</label><input type="text" value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600" /></div>
                  <div className="col-span-2"><label className="block text-xs font-semibold text-onyx-500 uppercase mb-1">Highlights (One per line)</label><textarea value={proj.highlights.join('\n')} onChange={(e) => updateProject(proj.id, { highlights: e.target.value.split('\n') })} rows={3} className="w-full px-3 py-2 bg-white border border-onyx-300 rounded focus:outline-none focus:border-brand-600 resize-none" /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addProject({ name: '', description: '', url: '', highlights: [] })} className="w-full py-3 border-2 border-dashed border-brand-300 text-brand-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"><Plus size={20} /> Add Project</button>
          </div>
        )}
      </div>

    </div>
  );
}
